/**

 Copyright 2023 Bufferstack.IO Analytics Technology LLP, Pune

 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

 http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.

 **/


module.exports = function(RED) {
    "use strict";

    function add(config) {
        RED.nodes.createNode(this, config);

        var node = this;
        this.topic = config.topic;
        this.add = 0;

        this.on("input", function(msg) {
            if( msg.hasOwnProperty("payload") ) {
                var input = Number(msg.payload);

                // handle reset
                if( msg.hasOwnProperty("reset") && msg.reset ) {
                    node.add = 0;

                    msg.payload = 0;
                    node.send(msg);
                }

                // handle input
                else if( !isNaN(input) && isFinite(input) ) {
                    node.add += input;

                    msg.payload = node.add;

                    // overwrite topic if configured
                    if( node.topic ) {
                        msg.topic = node.topic;
                    }

                    node.send(msg);
                }

                // everything else
                else {
                    node.log("Not a number: " + msg.payload);
                }
            }
        });
    }

    RED.nodes.registerType("add", add);
};

