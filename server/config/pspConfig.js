/**
 * Created by MATIASJ on 9/11/2016.
 */
var config = {
    db : {
    //'url': 'mongodb://iatsu_fxt:5010Foxy@ds061246.mlab.com:61246/fxtests'
    //'url' : 'mongodb://iatsu_fxt:5010Foxy@172.30.72.123:27017/fxtests'
    'url' : 'mongodb://iatsu_fxt:5010Foxy@127.0.0.1:27017/fxtests'
},

fb : {
    'appID' : '177968942655721',
    'appSecret' : 'fb59a5b01c6758171d982bc134c4dead',
    'callbackURL' : 'http://127.0.0.1:3000/login/facebook/callback'
},

tw : {
    'apikey' : 'QXlEQsopnTqkqpKm5duVEzPYk',
    'apisecret' : 'CxFVi4mtBM9v6zULwl1BdU42R6B1tjBTlquCGsig43uoCqWWDM',
    'callbackUrl' : 'http://127.0.0.1:3000/login/twitter/callback'
},

gp : {
    'clientID' : '521172022369-ef7k0v5l38c4ihsv1f6min111dcs6sf7.apps.googleusercontent.com',
    'clientSecret' : 'tnptGzKaJKc21e3J6XoW9wew',
    'callbackUrl' : 'http://127.0.0.1:3000/login/google/callback'
}};

module.exports = config;