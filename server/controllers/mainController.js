module.exports = {
    getClasses: (req, res) => {
      const dbInstance = req.app.set("db");
  
      dbInstance.getClasses().then(response => {
          console.log(response)
          return res.status(200).json(response)
      }).catch(console.log)
    },
    getRaces: (req, res) => {
        const dbInstance = req.app.set("db");
    
        dbInstance.getRaces().then(response => {
            console.log(response)
            return res.status(200).json(response)
        }).catch(console.log)
      }
  };