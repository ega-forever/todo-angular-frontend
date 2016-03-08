/**
 *@controller toDo controller
 * @inject todoHelpers to share actions
 */
angular.module('todo', ['ui.bootstrap'])
.controller('todoCtrl', function(todoHelpers){
        var _this = this;

        _this.tasks = [];
            todoHelpers.doGet().then(function (data) {
           console.log(data);
            _this.tasks = data.data;
        });

        _this.add = function(){

            todoHelpers.doAdd({name: _this.task}).then(function(data){
                _this.tasks.push(data.data);
            });

            _this.task = null;

        };

        _this.remove = function(item){

            todoHelpers.doRemove(item).then(function(data){
                _.pull(_this.tasks, item);
            });



        }

    });
