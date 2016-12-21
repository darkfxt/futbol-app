/**
 * Created by MATIASJ on 14/12/2016.
 */
angular.module('socialLoginRouter', [ui.router])
    .config( function ($stateProvider, $urlRouterProvider ){
        $urlRouterProvider.otherwise('/');

        $stateProvider
            .state('login', {
                url: '/api/user/login'
        })
            .state('logout', {
                url: '/api/user/logout'
            })
    })