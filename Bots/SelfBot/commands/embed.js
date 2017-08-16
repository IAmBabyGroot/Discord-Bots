/*
  Optional comment string to describe the command.
*/
module.exports = (self) => {
  self.registerCommand('embed', function (msg, args) {
	
	var description = "";
	
	for (var i = 1; i < args.length; i++) {
		description = description + " " + args[i];
	}
	
    this.embed(msg, { 
      title: 'General Memes',
      description: description,
      color: "00ff00"
    }, 0)

  }, {
    noPms: false, 
    aliases: ['em', 'emb'], 
    perms: [],
    deleteAfter: false 
  })
}
