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

const logger = require('@hyperledger/caliper-core').CaliperUtils.getLogger('helper-module');

let colors = ['blue', 'red', 'green', 'yellow', 'black', 'purple', 'white', 'violet', 'indigo', 'brown'];
let makes = ['Toyota', 'Ford', 'Hyundai', 'Volkswagen', 'Tesla', 'Peugeot', 'Chery', 'Fiat', 'Tata', 'Holden'];
let models = ['Prius', 'Mustang', 'Tucson', 'Passat', 'S', '205', 'S22L', 'Punto', 'Nano', 'Barina'];
let owners = ['Tomoko', 'Brad', 'Jin Soo', 'Max', 'Adrianna', 'Michel', 'Aarav', 'Pari', 'Valeria', 'Shotaro'];

let carNumber;
let txIndex = 0;

String.prototype.hashCode = function(){
	var hash = 0;
	if (this.length == 0) return hash;
	for (var i = 0; i < this.length; i++) {
		var char = this.charCodeAt(i);
		hash = ((hash<<5)-hash)+char;
		hash = hash & hash; // Convert to 32bit integer
	}
	return hash;
}

module.exports.createCar = async function (bc, contx, args, hash, color, make, model, owner) {

    while (txIndex < args.assets) {
        txIndex++;
        carNumber = 'Client' + contx.clientIdx + '_CAR' + hash + txIndex.toString();
        color = colors[Math.floor(Math.random() * colors.length)];
        make = makes[Math.floor(Math.random() * makes.length)];
        model = models[Math.floor(Math.random() * models.length)];
        owner = owners[Math.floor(Math.random() * owners.length)];
    
        let myArgs = {
            chaincodeFunction: 'createCar',
            chaincodeArguments: [carNumber, make, model, color, owner]
        };
        console.log(`====${JSON.stringify(myArgs)}====`)
        try {
            const res = await bc.invokeSmartContract(contx, 'fabcar', 'v1', myArgs, 30);
            console.log(`=== invoking smart contract result: ${JSON.stringify(res)} ===`)  
            logger.debug(`===HELPER${hash} SMART CONTRACT RESULT for ${carNumber}==`, JSON.stringify(res)); 
        } catch (error) {
            logger.debug(`===HELPER${hash} FAILED TO CREATE ${carNumber}==`, error);
        }
    }

};
