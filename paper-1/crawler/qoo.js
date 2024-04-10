
const Promise = require('bluebird');
const _ = require('lodash');

let a = [1,2,3,4,5,6];



const run = async () => {
    let pickTotal = _.random(1, a.length/2);
    // console.log(pickTotal)

    let cloneA = _.cloneDeep(a);

    await Promise.mapSeries(new Array(pickTotal), async => {
        const ri = Math.floor(Math.random() * cloneA.length);
        let [ rs ] = cloneA.splice(ri, 1);
        console.log(rs)
    });
};

run();
