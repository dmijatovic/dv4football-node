
const axios = require ('axios');
const { URL, URLSearchParams } = require('url');

const wiki={
  header:{
    "Api-User-Agent": "dv4all.com api demo"
  },
  api:{
    query: "https://en.wikipedia.org/w/api.php?action=query&format=json",
    search: "https://en.wikipedia.org/w/api.php?action=opensearch&format=json"
  },
  img:{
    "445":"https://en.wikipedia.org/wiki/Premier_League#/media/File:Premier_League_Logo.svg"
  }
}

const apiWiki = {
  query: (title)=>{
    let url = wiki.api.query + "&title='" + title + "'";
    //console.log( url )
    return new Promise((res,rej)=>{
      axios.get(url,{
        headers: wiki.header
      })
      .then((resp)=>{
        let data=[];
        //console.log(res.data);
        //resolve data
        return res(resp.data);
      })
      .catch((e)=>{
        rej(e);
      });
    })
  },

  openSearch: (search)=>{
    let url = wiki.api.search + "&search=" + search;
    //console.log( url );
    return new Promise((res,rej)=>{
      axios.get(url,{
        headers: wiki.header
      })
      .then((resp)=>{
        //console.log("wiki search...", resp.data);
        let found=[], desc=[], url=[];
        //resolve data
        if (resp.data[1]){
          found = resp.data[1];
          desc = resp.data[2];
          url = resp.data[3];
        }
        return res({
          title: found[0],
          desc: desc[0],
          url: url[0]
        });
      })
      .catch((e)=>{
        rej(e);
      });
    })
  },

  getInfo: (term)=>{
    return new Promise((res,rej)=>{
      this.openSearch(term)
      .then((d)=>{
        //console.log(d);
        return res(d);
      })
      .catch((e)=>{
        rej(e);
      });

    })
  }
}


module.exports = apiWiki;

