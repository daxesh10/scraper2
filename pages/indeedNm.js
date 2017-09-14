var Nightmare = require('nightmare')
var nightmare = Nightmare()
var iframe = require('nightmare-iframe')
let firebaseClient = require('../firebaseClient.js')
let global = require('../global.js')
let cheerio =require("cheerio")

//initilaizing night mare
            var nightmare = Nightmare({
            openDevTools: {
                mode: 'detach'
            },
            webPreferences: {
                            webSecurity:false
            },
              show: true
            });




   let urls = []
                urls.push("https://www.indeed.com/pagead/clk?mo=r&ad=-6NYlbfkN0CX0KbZ_zVILHcZDc9iy9izLrOTAJvjt8yw58HQ1lXH1TC2UYBrlSsis_4yQyWfRhCxVuRIWZLe0F51R5F_w39v2UqetuKWfQ9i1ECbvroYHpIyeHKhkD96Z0kDQdBhUWjdWrfJw9vovBdMd_g_MloNJm13phsFOA0dm9BofeEF190cf-AmXaQKal_CmyKh5gDbr0Y_Jr-8BxLacE2PCj8z_gSGYaupCa1pWvH5t6UUe7UbyuxokovJ28ArXBJT68n0VdHqVsJPZNnY4PlhtjqKxM8eKWWd4Cv3PAez33yPUeiC2dLdjpyLveY0kXLC3EftysF9GvVpsNhUEHJxZdRAAYu1Pp6cE9cq_U3ZCyE8j1Fj6C-gY2rAvmVxjz2xaKrIHZvhca3hRS8kZoO-7G8EMFVhobT8ff-EyFC8FvFhrjjPSjMBqMK07pZU9mQYZBoikHexukx4wYVjBm-nsOKh4mgr2N2hDczEgvc4bOaUOw==&p=1&sk=&fvj=0")
          
               urls.push("https://www.indeed.com/rc/clk?jk=2939bdddb2829a7b&fccid=3a7a8934559b0c46")
               urls.push("https://www.indeed.com/pagead/clk?mo=r&ad=-6NYlbfkN0A16okWtYWD88-_BalVW0-XRCtPgZ2dWOpJEqJkdSfs6B8lKtqijgz0280NkmxNTNIynH9DKOjOAGQh482VqabO0-yHpOK6zBZZ-QFIJQl29KATb9tNBJvV_dO9YpLBX6RtlnwQPaEXmYVQuHlnA8-JWcDaE4B75P8Y9j8kJXpD8wqezi4Qc37r75VQHCDH_7BmZxswMHcaVEdybabQUMzwKG-EwL2chm9WVHJtYp5RGxGmXofB-KqY4-lsclC7frYV_RsBxF0H8Len1KEHNG2SS_LMNQAVQ_j103IyY5gpVPvvkBS7WWHGy9aRVBtoBFXeIQfJa3XedcSQJ63skY_umTIKyrfVlTHK_rso_1hA5usfmaJoewyJmq0HJMvDXhCMC6FCK_YMmwspaQNa9HaCqH6prFTIHFZ3gjwQMasz4_exURLMFG8C&p=4&sk=&fvj=1")
             

    let src =''


   nightmare
         .goto("https://indeed.com/")
         .wait('body')
         .title()
         .wait(7000)
         .click(".navBi #userOptionsLabel")
         .wait(2000)
         .type("#signin_email",global.linkedinEmail)
         .type("#signin_password",global.linkedinPass)
         .click("button[type='submit']")
        //  .goto(urls[0])
        //  .wait(3000)
        //  .wait('iframe')
        //  .click("a.indeed-apply-button") 
        //  .wait(2000)
        //  .inject('js', './node_modules/jquery/dist/jquery.js')
        // .evaluate(()=>{

        //     return $('iframe').contents().find('body').html()
        // })
        // .then(res=>{
        //   let r =  cheerio.load(res)
        //     let src = r('script').attr('src')
        //   console.log(src)
          
        // })
         .goto("https://apply.indeed.com/indeedapply/tracking/thirdpartytag.js?jk=c98a7767fbeb6f6c&sponsored=true&tag=IMPRESSION&version=20170705011707")
         .wait('body')
         .title()
         .wait(7000)
         .evaluate(()=>{
             return document.body.innerHTML
         })
         .then(res=>{
             console.log(res)
         })
      
        // .use(iframe.withFrameName('iframe', function(nightmare) {
        //     nightmare
        //         .wait('textarea')
        //         // .type('input[name=username]', 'username')
        //         // .type('input[name=password]', 'password')
        //         // .click('button[type=submit]')
        // }))
        // //.wait('.for-my-logged-in-indicator-or-something-else')
        // // ... 
        // .run(function(err, nightmare){
        //     if (err) return console.error(err);
        //     console.log('Done!');
        // });
      
         