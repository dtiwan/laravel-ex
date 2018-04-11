<!DOCTYPE html>
<html ng-app="AppraisalGuru">
  <head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="generator" content="Mobirise v3.12.1, mobirise.com">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="shortcut icon" href="assets/images/xhome-value-icon1-128x128.png" type="image/x-icon">
    <meta name="description" content="">
    <title>Appraisals Guru</title>
    <link rel="icon" href="assets/img/favicon.png" type="image/png" sizes="16x16">
    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:700,400&amp;subset=cyrillic,latin,greek,vietnamese">
    <link rel="stylesheet" href="assets/web/assets/mobirise-icons/mobirise-icons.css">
    <link rel="stylesheet" href="assets/animate.css/animate.min.css">
    <link rel="stylesheet" href="assets/mobirise/css/mbr-additional.css" type="text/css">
    <link rel="stylesheet" href="assets/theme/css/style.css">
    <link rel="stylesheet" href="assets/bootstrap/css/bootstrap.min.css">
    <link rel="stylesheet" href="assets/mobirise/css/style.css">
    <link rel="stylesheet" type="text/css" href="/css/app.css" />
    <script>
      (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
      (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
      m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
      })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

      ga('create', 'UA-99742227-1', 'auto');
      ga('send', 'pageview');

</script>
  </head>
  <body ng-controller="appCtrl">
    <div class="containerarea">
        <div ui-view name="header"></div>
        <div ui-view name="content"></div>
        <div ui-view name="footer"></div>
    </div>
    <!-- AngularJS files-->
    <script src="assets/web/assets/jquery/jquery.min.js"></script>
     <script src="assets/countdown/jquery.countdown.min.js"></script>
    <script src="assets/tether/tether.min.js"></script>
    <script src="assets/bootstrap/js/bootstrap.min.js"></script>
    <script src="assets/smooth-scroll/smooth-scroll.js"></script>
            
    <script src="assets/data-tables/jquery.data-tables.min.js"></script>
    <script src="assets/data-tables/data-tables.bootstrap4.min.js"></script>
    <script src="assets/dropdown/js/script.min.js"></script>
    <script src="assets/touch-swipe/jquery.touch-swipe.min.js"></script>
    <script src="assets/viewport-checker/jquery.viewportchecker.js"></script>
    <script src="assets/theme/js/script.js"></script>
    <script src="assets/mobirise/js/script.js"></script>
    <script src="assets/formoid/formoid.min.js"></script>
    <script src="https://code.highcharts.com/highcharts.js"></script>
    <script src="https://code.highcharts.com/modules/exporting.js"></script> 


    <script src="bower_components/angular/angular.min.js"></script>
    <script src="http://cdnjs.cloudflare.com/ajax/libs/moment.js/2.10.6/moment-with-locales.js"></script>
    <script src="bower_components/angular-ui-router/release/angular-ui-router.min.js"></script>
    <script src="bower_components/oclazyload/dist/ocLazyLoad.min.js"></script>      
    <script src="bower_components/angular-messages/angular-messages.js"></script>
    <script type="text/javascript" src="bower_components/angular-ui-calendar/src/calendar.js"></script>
    <script type="text/javascript" src="bower_components/fullcalendar/dist/fullcalendar.min.js"></script>
    <script type="text/javascript" src="bower_components/fullcalendar/dist/gcal.js"></script>
    <script src="bower_components/ngstorage/ngStorage.min.js"></script>
    <script src="bower_components/angular-jwt/dist/angular-jwt.js"></script>

    <!-- JS files-->
    <script src="components/app.module.js"></script>
    <script src="components/app.routes.js"></script>
    <script src="components/app.main.js"></script>
    
   <!--  <script>
      require('./renderer.js')
    </script> -->
  </body>
</html>
