$(function () {
    var icons = {
        104: {
            title: '阴',
            icon: "icon-tianqi-yin"
        },
        101: {
            title: '多云',
            icon: "icon-tianqi-duoyun"
        },
        100: {
            title: '晴',
            icon: "icon-tianqi-qing"
        },
        300: {
            title: '阵雨',
            icon: "icon-tianqi-zhenyu"
        },
        301: {
            title: '阵雨',
            icon: "icon-tianqi-zhenyu"
        },
        302: {
            title: '雷阵雨',
            icon: "icon-tianqi-leizhenyu"
        },
        303: {
            title: '雷阵雨',
            icon: "icon-tianqi-leizhenyu"
        },
        305: {
            title: '小雨',
            icon: "icon-tianqi-xiaoyu"
        },
        306: {
            title: '中雨',
            icon: "icon-tianqi-zhongyu"
        },
        307: {
            title: '大雨',
            icon: "icon-tianqi-dayu"
        },
        310: {
            title: '暴雨',
            icon: "icon-tianqi-baoyu"
        },
        311: {
            title: '大暴雨',
            icon: "icon-tianqi-dabaoyu"
        },
        312: {
            title: '特大暴雨',
            icon: "icon-tianqi-tedabaoyu"
        },
        314: {
            title: '小雨转中雨',
            icon: "icon-tianqi-xiaoyuzhuanzhongyu"
        },
        315: {
            title: '中雨转大雨',
            icon: "icon-tianqi-zhongyuzhuandayu"
        },
        316: {
            title: '大雨转暴雨',
            icon: "icon-tianqi-dayuzhuanbaoyu"
        },
        317: {
            title: '大雨转特大暴雨',
            icon: "icon-tianqi-dayuzhuantedabaoyu"
        },
        399: {
            title: '雨',
            icon: "icon-tianqi-yu"
        },
        499: {
            title: '雪',
            icon: "icon-tianqi-xue"
        },
        501: {
            title: '雾',
            icon: "icon-tianqi-wu"
        }
    };
    var area = '';
    var time = new Date();
    var arr = ["星期天", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"];



    $(".btn").on("click", function () {
        
        console.log($("hour"));
        $(".f18").show()
        $("#sp1").text(time.getFullYear() + "/" + (time.getMonth() + 1) + "/" + time.getDate());
        $("#sp2").text(arr[time.getDay()]);
        area = $(".form-control").val();
        api.ajax({
            type: 'get',
            url: 'https://api.heweather.net/s6/weather/hourly',
            data: {
                location: area,
                key: '2793031c9a774764bb9158437edbc8bd'
            },
            isAsync: true,
            success: function (d) {
                console.log('d ==> ', JSON.parse(d));

                // console.log(time)
                // var $h5 = $("h5").text(JSON.parse(d).HeWeather6[0].update.loc);
                // $("h5").append($h5)
                console.log(JSON.parse(d).HeWeather6[0].hourly.slice(0, 24));
                var hourWeather = JSON.parse(d).HeWeather6[0].hourly.slice(0, 24);
                for (var i = 0; i < hourWeather.length; i++) {
                    var $li = $(`<li>
                        <div>${hourWeather[i].time.slice(-5)}</div>
                        <div><i class="icon iconfont ${icons[hourWeather[i].cond_code].icon} f30"></i></div>
                        <div>${hourWeather[i].tmp + '°'}</div>
                    </li>`);
                    $(".uls").append($li);
                }

            }
            
        })
        $(".hour ul ").empty("")
        api.ajax({
            type: 'get',
            url: 'https://api.heweather.net/s6/weather/forecast',
            data: {
                location: area,
                key: '2793031c9a774764bb9158437edbc8bd'
            },
            isAsync: true,
            success: function (d1) {

                console.log('d ==> ', JSON.parse(d1));
                var preForecast = JSON.parse(d1).HeWeather6[0].daily_forecast;
                var nowHour = new Date(JSON.parse(d1).HeWeather6[0].update.loc).getHours();

                for (var i = 0; i < preForecast.length; i++) {
                    var lis = $(`<li>
                        <div>${arr[new Date(preForecast [i].date).getDay()]}</div>
                        <div><i class="icon iconfont ${nowHour >= preForecast[i].sr.substr(0, 2) && nowHour < preForecast[i].ss.substr(0, 2) ? icons[preForecast[i].cond_code_d].icon :  icons[preForecast[i].cond_code_n].icon} f32 ic"></i></div>
                        <div>${nowHour >= preForecast[i].sr.substr(0, 2) && nowHour < preForecast[i].ss.substr(0, 2) ? preForecast[i].cond_txt_d : preForecast[i].cond_txt_n}</div>
                        <div>${preForecast[i].tmp_min + '°~' + preForecast[i].tmp_max + '°'}</div>
                        
                    </li>`);
                    $(".ula").append(lis);
                }

                // console.log(JSON.parse(d).HeWeather6[0].basic.parent_city)

            }
        })
        $(".days ul ").empty("")
        api.ajax({
            type: 'get',
            url: 'https://api.heweather.net/s6/weather/now',
            data: {
                location: area,
                key: '2793031c9a774764bb9158437edbc8bd'
            },
            isAsync: true,
            success: function (d2) {
                // console.log(d2)
                console.log('d ==> ', JSON.parse(d2));
                $(".f70").text(JSON.parse(d2).HeWeather6[0].now.tmp + "°")
                $(".sp").text(JSON.parse(d2).HeWeather6[0].now.cond_txt)


            }
        })






    })



})