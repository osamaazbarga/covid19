const proxy="https://api.allorigins.win/raw?url=";
const countriesurl=`${proxy}https://restcountries.herokuapp.com/api/v1`;
const coronaurl="https://corona-api.com/countries";

const statics=document.querySelector(".statics");
const loading=document.querySelector(".loading");


const origin={
    asia:{},
    europe:{},
    africa:{},
    americas:{},
}
const datatype={
    allcoronadata:[],
    currentregion:'global',
    currenttype:'confirmed',
    loadingbar: true,

}



async function charts(){
    datatype.allcoronadata=await coronacountrys();

    
}



async function coronacountrys(){
    const res=await fetch(coronaurl);
    const data=await res.json();
    return data;
}

async function returnbycountrydata(code){
    const res=await fetch(coronaurl+`/${code}`);
    const data=await res.json();
    return data;
}



async function allcountries(){
    const res=await fetch(countriesurl);
    const data=await res.json();
    return data;
}


async function byorigin(originname){

    const res=await fetch(`${countriesurl}/region/${originname}`);
    const data=await res.json();
    return data;
}

async function createOriginCountrys(origin){
    for(const key in origin){
        origin[key]=await byorigin(key);
    }
}



async function createbtncountries(){
    const btns=await coronacountrys();
    const btnss = btns.data.map((c,i) => {
        return `<button data-index="${i}"> ${c.name}</button>`;
    });
    document.querySelector('.contries').innerHTML= btnss.join(' ');
    document.querySelectorAll('.contries button').forEach( btn => {
        btn.addEventListener('click', countryselectclick);
      })

}

async function countryselectclick(event){
    if(datatype.loadingbar)
        return;
    const indexcountry=event.target.dataset.index;
    const getdataaboutcorona=await coronacountrys();
    const info=getdataaboutcorona.data[indexcountry];
    const countryinfo =document.querySelector(".statics .info");
    countryinfo.innerHTML=`
    <h3> ${info.name} </h3>
    <div class="boxes">
        <div> Total Cases: <span>${info.latest_data.confirmed}</span> </div>
        <div> New Cases:<span>${info.today.confirmed}</span> </div>
        <div> Total Death: <span>${info.latest_data.deaths}</span></div>
        <div> new Deaths: <span>${info.today.deaths}</span></div>
        <div> Total Recovered: <span>${info.latest_data.recovered}</span></div>
        <div> In critical condition:<span>${info.latest_data.critical}</span> </div>
    </div>
    `
    document.querySelector(".statics .info").hidden=false;
    document.querySelector(".statics .charts").hidden=true;
    datatype.loadingbar=false;
}

function regionselectclick(event){
    if(datatype.loadingbar)
        return;
    const region=event.target.dataset.region||datatype.currentregion;
    const type = event.target.dataset.type || datatype.currenttype;
    datatype.currentregion=region;
    datatype.currenttype=type;
    updatecharts(region,type);
    document.querySelector(".statics .charts").hidden=false;
    document.querySelector(".statics .info").hidden=true;
    datatype.loadingbar=false;

}


function createChart(countryname, numberof,region,type){//label/datanumbers/countrinames

    const ctx = document.getElementById('myChart').getContext('2d');
    const myChart = new Chart(ctx, {
        type: "line",
        data: {
          labels: countryname,
          datasets: [
            {
              label: `${type} in ${region}`,
              data: numberof,
              backgroundColor: "rgba(255, 206, 86, 1)",
              borderColor: "rgba(54, 162, 235, 1)",
              borderWidth: "1",
            },
          ],
        },
        options: {
          maintainAspectRatio: false,
          scales: {
            yAxes: [{
                ticks: {
                  beginAtZero: true,
                },
              },
            ],
          },
        },
      });
}
async function updatecharts(region,type){
    showloadingbar();
    let labels = [];
    let datavalues = [];
    if(region=='global'){
        const global=await coronacountrys();
        for (let country of global.data) {
            labels.push(country.name);
            datavalues.push(country.latest_data[type]);
        }

    }
    else {
        const countriescodesdata=await byorigin(region);
        for (let i = 0; i < countriescodesdata.length; i++) {
            const code=countriescodesdata[i].cca2;
            const countrycoronadata=await returnbycountrydata(code);
            
            if(countrycoronadata&&!countrycoronadata.message){
                    labels.push(countrycoronadata.data.name);
                    datavalues.push(countrycoronadata.data.latest_data[type]);

            }
        }
    }
   
    createChart(labels,datavalues,region,type);
    removeloadingbar();
}



const showloadingbar  = () => {

  datatype.loadingbar=true;
  loading.hidden=true;
  statics.hidden=false;


}

const removeloadingbar  = () => {
  datatype.loadingbar=false;
  statics.hidden=false;
  loading.hidden=true;

}
document.querySelectorAll('.option button').forEach(btn => {btn.addEventListener('click',regionselectclick)});
updatecharts ('global', 'confirmed');




