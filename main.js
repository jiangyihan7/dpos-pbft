var Node = require('./noder');
var async = require('async');
var Flags = require('commander');
var badid = require('./badid');
var nodes = [];

function main() {
  // Flags
  //   .version(require('./package').version)
  //   .option('-b, --bad-ids [value]', 'Specify bad node id list, for example: 1,2,3')
  //   .option('-p, --pbft', 'Enable pbft algorithms')
  //   .parse(process.argv);
  // Flags.badIds = badid(20);
  // global.Flags = Flags;
  // var badIds = [];
  // console.log(Flags)
  // console.log(Flags.badIds);

  // if (Flags.badIds) {
  //   badIds = Flags.badIds.split(',').map(function(e) {
  //     return Number(e);
  //   });
  // }
  badIds = badid(20);
  console.log('badid:'+badIds);
  Flags.badIds = badIds;
  // console.log('flags.badids'+Flags.badIds);
  Flags.pbft = true;
  global.Flags = Flags;
  // Flags.pbft = !!Flags.pbft;
  async.series([
    function(next) {
      console.log('step 1 init nodes ...');
      for (var i = 0; i < 20; i++) {
        nodes[i] = new Node(i, badIds.indexOf(i) !== -1);
        // console.log(nodes[i])
      }
      setTimeout(next, 1000);
    },
    function(next) {
      console.log('step 2 init p2p network ...');
      for (var i in nodes) {
        if(i!='range'){
            nodes[i].connect();
        }
      }
      setTimeout(next, 2000);
    },
    function(next) {
      console.log('step 3 start forging');
      for (var i in nodes) {
        if(i!='range'){
        nodes[i].start();
      }}
      next();
    }
  ], function(err, results) {
    setInterval(function() {
      nodes.forEach(function(node) {
        node.printBlockChain();
      });
    }, 5000);
  });
}
main();

