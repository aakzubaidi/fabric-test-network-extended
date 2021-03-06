/*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

const name = 'Querying all cars.';
module.exports.info = name;

const helper = require('./helper');

let startingKey, endingKey, bc, contx;

module.exports.init = async function (blockchain, context, args) {
    bc = blockchain;
    contx = context;

    startingKey =  helper.generateNumber(contx.clientIdx, args.startKey);
    endingKey = helper.generateNumber(contx.clientIdx, args.endKey);

    return Promise.resolve();
};

module.exports.run = function () {

    const args = {
        chaincodeFunction: 'queryAllCars',
        chaincodeArguments: [startingKey, endingKey]     
    };

    return bc.bcObj.querySmartContract(contx, 'fabcar', 'v1', args, 60)

};

module.exports.end = function () {
    return Promise.resolve();
};
