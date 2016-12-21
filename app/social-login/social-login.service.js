/**
 * Created by MATIASJ on 13/12/2016.
 */
angular.module('socialLoginService', [])
    .factory('factoryUsuarios', [ '$resource', function($resource){
        var isLogged = false;

        var expuesto = {
            loginUser: function(userData){

            },
            logoutUser: function() {

            }

        }


        return expuesto;
    }]);