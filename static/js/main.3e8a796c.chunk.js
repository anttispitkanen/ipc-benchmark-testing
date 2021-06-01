(this["webpackJsonpvisualization-ui"]=this["webpackJsonpvisualization-ui"]||[]).push([[0],{174:function(e,a,r){"use strict";r.r(a);var t=r(0),o=r.n(t),n=r(57),i=r.n(n),s=(r(66),r(35)),h=r(61),u=r(60),d=r(1),c=["benchmark","http","http-express-axios"],m=["small","medium","large"],M=[{background:"rgba(255, 99, 132, 0.2)",border:"rgba(255, 99, 132, 1)"},{background:"rgba(54, 162, 235, 0.2)",border:"rgba(54, 162, 235, 1)"},{background:"rgba(255, 206, 86, 0.2)",border:"rgba(255, 206, 86, 1)"},{background:"rgba(75, 192, 192, 0.2)",border:"rgba(75, 192, 192, 1)"},{background:"rgba(153, 102, 255, 0.2)",border:"rgba(153, 102, 255, 1)"},{background:"rgba(255, 159, 64, 0.2)",border:"rgba(255, 159, 64, 1)"}],T=[{label:"TheOperation duration (ms)",dataProperty:"TheOperationDurationMs"},{label:"Overhead duration (ms)",dataProperty:"overheadDurationMs"}],D={scales:{y:{title:{display:!0,text:"Milliseconds"},stacked:!0},x:{stacked:!0}}},p=function(e){var a=e.size,r=e.selectFn,t=e.activeSize;return Object(d.jsx)("button",{style:{margin:"5px"},disabled:a===t,onClick:function(){return r(a)},children:a})},v=function(e){var a=e.dataProp,r=Object(t.useState)("medium"),o=Object(h.a)(r,2),n=o[0],i=o[1],s=Object(t.useMemo)((function(){return function(e,a){var r=function(e,a){return{TheOperationDurationMs:e.map((function(e){var r;return(null===(r=e.statisticsByMockDataSize.find((function(e){return e.mockDataSize===a})))||void 0===r?void 0:r.averages.TheOperationDurationMs)||0})),overheadDurationMs:e.map((function(e){var r;return(null===(r=e.statisticsByMockDataSize.find((function(e){return e.mockDataSize===a})))||void 0===r?void 0:r.averages.overheadDurationMs)||0}))}}(e,a);return{labels:c,datasets:T.map((function(e,a){return{label:e.label,data:r[e.dataProperty],backgroundColor:M[a].background,borderColor:M[a].border,borderWidth:1}}))}}(a,n)}),[n]);return Object(d.jsxs)(d.Fragment,{children:[Object(d.jsx)("div",{className:"header",children:Object(d.jsx)("h1",{className:"title",children:"Durations by IPC method"})}),Object(d.jsx)(u.a,{type:"bar",width:800,height:500,data:s,options:D}),Object(d.jsxs)("div",{children:[Object(d.jsxs)("p",{children:["Viewing mock data size: ",Object(d.jsx)("b",{children:n})]}),m.map((function(e){return Object(d.jsx)(p,{size:e,selectFn:i,activeSize:n})}))]})]})};var g=function(){console.log("Here are the analyzed results:"),console.log(s);var e=s;return Object(d.jsxs)("div",{className:"App",children:[Object(d.jsx)("h1",{children:"IPC testing results"}),Object(d.jsxs)("p",{children:["See"," ",Object(d.jsx)("a",{href:"https://github.com/anttispitkanen/ipc-benchmark-testing",target:"_blank",rel:"noreferrer noopener",children:"the repo"})," ","for context."]}),Object(d.jsx)("p",{children:"All tests run on Docker Desktop for Mac, Docker engine v20.10.6, at 8 CPU and 4GB RAM."}),Object(d.jsxs)("p",{children:["Test suite run on"," ",Object(d.jsx)("b",{children:new Date(e[0].statisticsByMockDataSize[0].runs[0].timestamp).toLocaleDateString()})]}),Object(d.jsx)(v,{dataProp:e})]})},k=function(e){e&&e instanceof Function&&r.e(3).then(r.bind(null,175)).then((function(a){var r=a.getCLS,t=a.getFID,o=a.getFCP,n=a.getLCP,i=a.getTTFB;r(e),t(e),o(e),n(e),i(e)}))};i.a.render(Object(d.jsx)(o.a.StrictMode,{children:Object(d.jsx)(g,{})}),document.getElementById("root")),k()},35:function(e){e.exports=JSON.parse('[{"ipcMethod":"benchmark","statisticsByMockDataSize":[{"mockDataSize":"small","runs":[{"durationMs":0.8325750000076368,"TheOperationDurationMs":0.5606929999776185,"overheadDurationMs":0.2718820000300184,"overheadPercentage":32.655556559772336,"timestamp":"2021-05-31T19:16:52.269Z"},{"durationMs":0.8109169999370351,"TheOperationDurationMs":0.5624550000065938,"overheadDurationMs":0.24846199993044138,"overheadPercentage":30.639633889748712,"timestamp":"2021-05-31T19:17:03.930Z"},{"durationMs":0.7679379999171942,"TheOperationDurationMs":0.526763999951072,"overheadDurationMs":0.2411739999661222,"overheadPercentage":31.40539991407219,"timestamp":"2021-05-31T19:17:15.438Z"},{"durationMs":0.7254899999825284,"TheOperationDurationMs":0.5020779999904335,"overheadDurationMs":0.22341199999209493,"overheadPercentage":30.794635349553438,"timestamp":"2021-05-31T19:17:27.246Z"},{"durationMs":0.7753239999292418,"TheOperationDurationMs":0.5256499999668449,"overheadDurationMs":0.24967399996239692,"overheadPercentage":32.20253725993041,"timestamp":"2021-05-31T19:17:39.292Z"}],"averages":{"durationMs":0.7824487999547273,"TheOperationDurationMs":0.5355279999785125,"overheadDurationMs":0.24692079997621477,"overheadPercentage":31.53955259461542},"comparisonToBenchmark":{"durationToBenchmarkMs":0,"durationToBenchmarkPct":0,"TheOperationDurationToBenchmarkMs":0,"TheOperationDurationToBenchmarkPct":0,"overheadDurationToBenchmarkMs":0,"overheadDurationToBenchmarkPct":0}},{"mockDataSize":"medium","runs":[{"durationMs":16.426952000008896,"TheOperationDurationMs":16.159940000041388,"overheadDurationMs":0.267011999967508,"overheadPercentage":1.625450661616126,"timestamp":"2021-05-31T19:17:51.201Z"},{"durationMs":15.970109999994747,"TheOperationDurationMs":15.71758499997668,"overheadDurationMs":0.25252500001806766,"overheadPercentage":1.5812351951123114,"timestamp":"2021-05-31T19:18:03.080Z"},{"durationMs":23.073380000074394,"TheOperationDurationMs":22.71023799991235,"overheadDurationMs":0.3631420001620427,"overheadPercentage":1.5738569735377819,"timestamp":"2021-05-31T19:18:14.891Z"},{"durationMs":18.00895800010767,"TheOperationDurationMs":17.73649999999907,"overheadDurationMs":0.27245800010859966,"overheadPercentage":1.5129026349385164,"timestamp":"2021-05-31T19:18:26.467Z"},{"durationMs":17.8521339999279,"TheOperationDurationMs":17.545561999897473,"overheadDurationMs":0.30657200003042817,"overheadPercentage":1.7172848917203192,"timestamp":"2021-05-31T19:18:38.237Z"}],"averages":{"durationMs":18.266306800022722,"TheOperationDurationMs":17.973964999965393,"overheadDurationMs":0.29234180005732924,"overheadPercentage":1.602146071385011},"comparisonToBenchmark":{"durationToBenchmarkMs":0,"durationToBenchmarkPct":0,"TheOperationDurationToBenchmarkMs":0,"TheOperationDurationToBenchmarkPct":0,"overheadDurationToBenchmarkMs":0,"overheadDurationToBenchmarkPct":0}},{"mockDataSize":"large","runs":[{"durationMs":62.83748400001787,"TheOperationDurationMs":62.51796299999114,"overheadDurationMs":0.31952100002672523,"overheadPercentage":0.5084878955793876,"timestamp":"2021-05-31T19:18:49.744Z"},{"durationMs":63.62317899998743,"TheOperationDurationMs":63.30209100001957,"overheadDurationMs":0.3210879999678582,"overheadPercentage":0.5046714185217335,"timestamp":"2021-05-31T19:19:01.349Z"},{"durationMs":73.58203499997035,"TheOperationDurationMs":73.13632699998561,"overheadDurationMs":0.44570799998473376,"overheadPercentage":0.6057293740040125,"timestamp":"2021-05-31T19:19:12.938Z"},{"durationMs":60.37730100005865,"TheOperationDurationMs":60.117119000060484,"overheadDurationMs":0.26018199999816716,"overheadPercentage":0.43092684781970364,"timestamp":"2021-05-31T19:19:24.569Z"},{"durationMs":65.29397499992047,"TheOperationDurationMs":64.90718500001822,"overheadDurationMs":0.3867899999022484,"overheadPercentage":0.5923823751007954,"timestamp":"2021-05-31T19:19:36.311Z"}],"averages":{"durationMs":65.14279479999095,"TheOperationDurationMs":64.79613700001501,"overheadDurationMs":0.34665779997594653,"overheadPercentage":0.5284395822051265},"comparisonToBenchmark":{"durationToBenchmarkMs":0,"durationToBenchmarkPct":0,"TheOperationDurationToBenchmarkMs":0,"TheOperationDurationToBenchmarkPct":0,"overheadDurationToBenchmarkMs":0,"overheadDurationToBenchmarkPct":0}}]},{"ipcMethod":"http","statisticsByMockDataSize":[{"mockDataSize":"small","runs":[{"durationMs":17.597710000001825,"TheOperationDurationMs":0.602402999997139,"overheadDurationMs":16.995307000004686,"overheadPercentage":96.57681027817212,"timestamp":"2021-05-31T19:19:49.002Z"},{"durationMs":18.091689000022598,"TheOperationDurationMs":0.5674080000026152,"overheadDurationMs":17.524281000019982,"overheadPercentage":96.86370907657154,"timestamp":"2021-05-31T19:20:01.631Z"},{"durationMs":18.071824000100605,"TheOperationDurationMs":0.6002030000090599,"overheadDurationMs":17.471621000091545,"overheadPercentage":96.67879124981674,"timestamp":"2021-05-31T19:20:14.191Z"},{"durationMs":18.46033300005365,"TheOperationDurationMs":0.5978490000125021,"overheadDurationMs":17.86248400004115,"overheadPercentage":96.76143978545369,"timestamp":"2021-05-31T19:20:26.508Z"},{"durationMs":17.77127000002656,"TheOperationDurationMs":0.5543090000282973,"overheadDurationMs":17.216960999998264,"overheadPercentage":96.88087007834855,"timestamp":"2021-05-31T19:20:39.195Z"}],"averages":{"durationMs":17.99856520004105,"TheOperationDurationMs":0.5844344000099226,"overheadDurationMs":17.414130800031124,"overheadPercentage":96.75232409367253},"comparisonToBenchmark":{"durationToBenchmarkMs":17.21611640008632,"durationToBenchmarkPct":2200.286638701785,"TheOperationDurationToBenchmarkMs":0.04890640003141011,"TheOperationDurationToBenchmarkPct":9.132370302462697,"overheadDurationToBenchmarkMs":17.167210000054908,"overheadDurationToBenchmarkPct":6952.516759101938}},{"mockDataSize":"medium","runs":[{"durationMs":36.948566999984905,"TheOperationDurationMs":18.22588399995584,"overheadDurationMs":18.722683000029065,"overheadPercentage":50.67228453010563,"timestamp":"2021-05-31T19:20:51.711Z"},{"durationMs":35.55772000004072,"TheOperationDurationMs":17.57088500005193,"overheadDurationMs":17.986834999988787,"overheadPercentage":50.584894081983286,"timestamp":"2021-05-31T19:21:04.084Z"},{"durationMs":37.850450999918394,"TheOperationDurationMs":19.12229800003115,"overheadDurationMs":18.728152999887243,"overheadPercentage":49.47933909671941,"timestamp":"2021-05-31T19:21:16.607Z"},{"durationMs":37.70440599997528,"TheOperationDurationMs":18.86281400010921,"overheadDurationMs":18.84159199986607,"overheadPercentage":49.97185740010974,"timestamp":"2021-05-31T19:21:29.185Z"},{"durationMs":38.080039999913424,"TheOperationDurationMs":18.60080100002233,"overheadDurationMs":19.479238999891095,"overheadPercentage":51.15341002776095,"timestamp":"2021-05-31T19:21:41.841Z"}],"averages":{"durationMs":37.228236799966545,"TheOperationDurationMs":18.476536400034092,"overheadDurationMs":18.751700399932453,"overheadPercentage":50.3723570273358},"comparisonToBenchmark":{"durationToBenchmarkMs":18.961929999943823,"durationToBenchmarkPct":103.80823122887783,"TheOperationDurationToBenchmarkMs":0.5025714000686996,"TheOperationDurationToBenchmarkPct":2.796107592674556,"overheadDurationToBenchmarkMs":18.459358599875124,"overheadDurationToBenchmarkPct":6314.306950376299}},{"mockDataSize":"large","runs":[{"durationMs":81.2074019999709,"TheOperationDurationMs":55.42630900000222,"overheadDurationMs":25.781092999968678,"overheadPercentage":31.74722053043627,"timestamp":"2021-05-31T19:21:54.467Z"},{"durationMs":85.18505699990783,"TheOperationDurationMs":56.41762700001709,"overheadDurationMs":28.767429999890737,"overheadPercentage":33.770512121535425,"timestamp":"2021-05-31T19:22:07.093Z"},{"durationMs":88.55696700001135,"TheOperationDurationMs":59.21430600003805,"overheadDurationMs":29.342660999973305,"overheadPercentage":33.13422082304325,"timestamp":"2021-05-31T19:22:19.774Z"},{"durationMs":81.21907399990596,"TheOperationDurationMs":55.41980000003241,"overheadDurationMs":25.79927399987355,"overheadPercentage":31.76504327038181,"timestamp":"2021-05-31T19:22:32.399Z"},{"durationMs":88.20662000006996,"TheOperationDurationMs":59.546873999992386,"overheadDurationMs":28.659746000077575,"overheadPercentage":32.49160437170684,"timestamp":"2021-05-31T19:22:45.098Z"}],"averages":{"durationMs":84.8750239999732,"TheOperationDurationMs":57.20498320001643,"overheadDurationMs":27.67004079995677,"overheadPercentage":32.581720223420724},"comparisonToBenchmark":{"durationToBenchmarkMs":19.732229199982243,"durationToBenchmarkPct":30.290731708036855,"TheOperationDurationToBenchmarkMs":-7.59115379999858,"TheOperationDurationToBenchmarkPct":-11.715441925182702,"overheadDurationToBenchmarkMs":27.323382999980822,"overheadDurationToBenchmarkPct":7881.946692639457}}]},{"ipcMethod":"http-express-axios","statisticsByMockDataSize":[{"mockDataSize":"small","runs":[{"durationMs":35.34114900010172,"TheOperationDurationMs":0.6143239999655634,"overheadDurationMs":34.72682500013616,"overheadPercentage":98.26173167158828,"timestamp":"2021-05-31T19:22:57.646Z"},{"durationMs":35.10596399998758,"TheOperationDurationMs":0.6004680000478402,"overheadDurationMs":34.50549599993974,"overheadPercentage":98.28955558648651,"timestamp":"2021-05-31T19:23:10.147Z"},{"durationMs":35.28458099998534,"TheOperationDurationMs":0.6404989999718964,"overheadDurationMs":34.64408200001344,"overheadPercentage":98.18476234712222,"timestamp":"2021-05-31T19:23:22.776Z"},{"durationMs":35.03455900005065,"TheOperationDurationMs":0.5990319999400526,"overheadDurationMs":34.435527000110596,"overheadPercentage":98.29016828800617,"timestamp":"2021-05-31T19:23:35.412Z"},{"durationMs":35.476038000080734,"TheOperationDurationMs":0.5505510000512004,"overheadDurationMs":34.925487000029534,"overheadPercentage":98.44810460500142,"timestamp":"2021-05-31T19:23:48.166Z"}],"averages":{"durationMs":35.248458200041206,"TheOperationDurationMs":0.6009747999953106,"overheadDurationMs":34.64748340004589,"overheadPercentage":98.29486449964092},"comparisonToBenchmark":{"durationToBenchmarkMs":34.46600940008648,"durationToBenchmarkPct":4404.890058247989,"TheOperationDurationToBenchmarkMs":0.06544680001679803,"TheOperationDurationToBenchmarkPct":12.22098564770171,"overheadDurationToBenchmarkMs":34.40056260006968,"overheadDurationToBenchmarkPct":13931.820487939205}},{"mockDataSize":"medium","runs":[{"durationMs":47.385145999956876,"TheOperationDurationMs":16.8385399999097,"overheadDurationMs":30.546606000047177,"overheadPercentage":64.46451805820115,"timestamp":"2021-05-31T19:24:00.685Z"},{"durationMs":54.60348800010979,"TheOperationDurationMs":20.643041000002995,"overheadDurationMs":33.9604470001068,"overheadPercentage":62.19464771195297,"timestamp":"2021-05-31T19:24:13.398Z"},{"durationMs":50.11973799997941,"TheOperationDurationMs":14.771843999857083,"overheadDurationMs":35.347894000122324,"overheadPercentage":70.52689301795003,"timestamp":"2021-05-31T19:24:25.953Z"},{"durationMs":52.65214400016703,"TheOperationDurationMs":17.11683399998583,"overheadDurationMs":35.5353100001812,"overheadPercentage":67.49071794696236,"timestamp":"2021-05-31T19:24:38.658Z"},{"durationMs":45.3802419998683,"TheOperationDurationMs":14.013887000037357,"overheadDurationMs":31.366354999830946,"overheadPercentage":69.11896811815585,"timestamp":"2021-05-31T19:24:51.074Z"}],"averages":{"durationMs":50.02815160001628,"TheOperationDurationMs":16.676829199958593,"overheadDurationMs":33.35132240005769,"overheadPercentage":66.75914897064447},"comparisonToBenchmark":{"durationToBenchmarkMs":31.761844799993558,"durationToBenchmarkPct":173.88213801354772,"TheOperationDurationToBenchmarkMs":-1.2971358000067994,"TheOperationDurationToBenchmarkPct":-7.216748224497471,"overheadDurationToBenchmarkMs":33.05898060000036,"overheadDurationToBenchmarkPct":11308.331751914156}},{"mockDataSize":"large","runs":[{"durationMs":98.35173800005578,"TheOperationDurationMs":56.518562000012025,"overheadDurationMs":41.83317600004375,"overheadPercentage":42.534251911257556,"timestamp":"2021-05-31T19:25:03.793Z"},{"durationMs":100.72391099995002,"TheOperationDurationMs":55.466947000008076,"overheadDurationMs":45.256963999941945,"overheadPercentage":44.931698492093304,"timestamp":"2021-05-31T19:25:16.509Z"},{"durationMs":100.97507399995811,"TheOperationDurationMs":57.05607599997893,"overheadDurationMs":43.91899799997918,"overheadPercentage":43.49489063013453,"timestamp":"2021-05-31T19:25:29.115Z"},{"durationMs":92.02352200006135,"TheOperationDurationMs":53.21864199987613,"overheadDurationMs":38.80488000018522,"overheadPercentage":42.16843602243278,"timestamp":"2021-05-31T19:25:42.499Z"},{"durationMs":98.33778099995106,"TheOperationDurationMs":56.99917199998163,"overheadDurationMs":41.33860899996944,"overheadPercentage":42.03736201856132,"timestamp":"2021-05-31T19:25:55.104Z"}],"averages":{"durationMs":98.08240519999526,"TheOperationDurationMs":55.85187979997136,"overheadDurationMs":42.23052540002391,"overheadPercentage":43.0333278148959},"comparisonToBenchmark":{"durationToBenchmarkMs":32.93961040000431,"durationToBenchmarkPct":50.565239795344006,"TheOperationDurationToBenchmarkMs":-8.944257200043651,"TheOperationDurationToBenchmarkPct":-13.803688945286321,"overheadDurationToBenchmarkMs":41.883867600047964,"overheadDurationToBenchmarkPct":12082.1939108118}}]}]')},66:function(e,a,r){}},[[174,1,2]]]);
//# sourceMappingURL=main.3e8a796c.chunk.js.map