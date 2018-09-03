module.exports = {
    getClasses: (req, res) => {
      const dbInstance = req.app.set("db");
  
      dbInstance.getClasses().then(response => {
          return res.status(200).json(response)
      }).catch(console.log)
    },
    getRaces: (req, res) => {
        const dbInstance = req.app.set("db");
    
        dbInstance.getRaces().then(response => {
            return res.status(200).json(response)
        }).catch(console.log)
    },

    createNewHero: (req, res) => {
        const dbInstance = req.app.set('db');
        console.log('req.body', req.body)
        dbInstance.createNewHero([req.body.name, 
                                    req.body.race, 
                                    req.body.class, 
                                    req.body.str, 
                                    req.body.def, 
                                    req.body.spd, 
                                    req.body.userId]).then(response => {
            res.status(200).json(response)
        }).catch(console.log)

    },

    getHeroes: (req, res) => {
        // const dbInstance = ;

        req.app.get('db').getHeroes([req.user.user_id]).then(response => {
            console.log('hero response', response[0])
            res.status(200).json(response)
        }).catch(console.log)
    }
  };