//Brigin in model
let Menu = require('../models/menu'); 
let User = require('../models/user');
const MenuController = {
    all: async function(req,res){
        try {
          const menus = await Menu.find();
          //res.render(__dirname+'/views/pug/menuAll',{menus:menus});
          res.json(menus);
        } catch (error) {
          console.log(error);
        }
       
    },

    create:  async function(req,res){
        let menu = 
          {menuName:req.body.menuName,
           description:req.body.description,
           group:req.body.group,
           items:req.body.items,
           createdBy: req.body.createdBy
          };
            
           try {
              let newMenu = await Menu.create(menu);
              let updateUser =  await User.findById({_id: newMenu.createdBy});
              updateUser.menus.push(newMenu);
              await updateUser.save();
              res.json(newMenu);
           } catch (error) {
              console.log(error);
              res.json(error);
           }
    },

    findById: async function(req,res){
        try {
          let menu = await Menu.findById({_id:req.params.id});
          res.json(menu);
        } catch (error) {
          console.log(error);
          res.json(error);
        }
    
    },

    delete: async function(req,res){
        try {
            let menu = await Menu.deleteOne({_id: req.params.id});
            res.json(menu);
        } catch (error) {
            console.log(error);
            res.json(error);
        }
    },

    //Not finished
    edit: async function(req,res){
        
        try {
            let id = req.params.id;
            let menu = await Person.updateOne({ _id: id }, { });
        } catch (error) {
            console.log(error);
            res.json(error);
        }
      }
}




module.exports = MenuController;