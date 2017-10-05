var jsonfile = require('jsonfile')
var file = 'dataX.json'
const scrapeIt = require("scrape-it");
var pages = 1;
var arr = { articles: [] };
var urlnumber = 0;


function scraper(pageNumber) {
    url = jobCategories[urlnumber] + "?page=" + pageNumber
    //a = url(a);
    // scrapeIt("http://jobspider.am/", {ß
    //     articles2: {
    //         listItem: "#wrap",
    //         link: {
    //             selector: "span4 >a",
    //             attr: "href",
    //         }

    //     }
    // })
    //console.log(url + '?page=' + pageNumber)
    scrapeIt(url , {
        
        articles: {
            listItem: ".job",
            data: {
                title: "li > a",
                url: {
                    selector: "li > a",
                    attr: "href"
                }, 
                comp: ".comp",
                host: {
                    selector: ".src",
                    convert: function (x) {
                        var y = x.match(/\S+/g) || []
                        return y[0]
                    }
                },
                date: {
                    selector: ".src",
                    convert: function (x) {
                        var y = x.match(/\S+/g) || []
                        var date = y[2] + y[3]
                        return date

                    }
                },
            }
        },
        pages: {
            selector: "#wrap > .padtop > .row > .span6"
        },
    }, (err, page) => {
        arr.articles.push(...page.articles);
         if (page.articles.length == 0) {
            if (urlnumber == jobCategories.length - 1) {
                jsonfile.writeFile(file, arr, { spaces: 2 }, function (err) {
                    console.error(err)
                });
            }
            urlnumber++;
            pageNumber = 1;
            
        }
        else {
            setTimeout(
                function () {
                    pageNumber++;
                    console.log(pageNumber);
                    console.log(url)
                    scraper(pageNumber);
                }, 3000);
        }
    });

}

var jobCategories = [
    "http://jobspider.am/category/17/Information_Technologies",
    "http://jobspider.am/category/3/Office",
    "http://jobspider.am/category/11/Security",
    "http://jobspider.am/category/9/Health",
    "http://jobspider.am/category/15/Art_Journalism_Media",
    "http://jobspider.am/category/18/Science_Education",
    "http://jobspider.am/category/2/Advertisement_PR",
    "http://jobspider.am/category/14/Legal_Services_Insurance",
    "http://jobspider.am/category/6/Services",
    "http://jobspider.am/category/4/Accounting_Finance_Banking",
    "http://jobspider.am/category/12/Management_Top_Executive",
    "http://jobspider.am/category/5/Sales",
    "http://jobspider.am/category/10/Travel_Restaurants_Hotels",
    "http://jobspider.am/category/http://jobspider.am/category/1/Other"
];

// function scrape2(){
//     var startPage = 8
//     console.log(jobCategories)
//     scraper(jobCategories[0], startPage);
// }

scraper(pages);




