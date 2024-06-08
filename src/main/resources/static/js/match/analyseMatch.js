async function analyseMatch(matchId) {
    await infoMatch(matchId);
    let teams = [];
    await matchFetch.findOneMatch(matchId)
        .then(res => res.json())
        .then(match => {
            teams.push(match.homeTeam);
            teams.push(match.guestTeam);
        })
    await infoTeamMatch(matchId, teams);
}

async function infoTeamMatch(matchId, teams) {
    const table = document.querySelector('#tableStat tbody');
    const quotationArr = await quotationFetch.getAllQuotes().then(res => res.json());

    for (const team of teams) {
        for (const quotation of quotationArr) {
            let firstTime = 0;
            let secondTime = 0;
            let value = 0;

            for (let i = 1; i <= 2; i++) {
                try {
                    const event = await eventFetch.findEventByMatchAndTeamAndQuotationAndPeriod(matchId, team.id, quotation.id, i).then(res => res.json());

                    if (event && event.valueEvent && typeof event.valueEvent === "number") {
                        if (i === 1) {
                            firstTime = event.valueEvent;
                        } else if (i === 2) {
                            secondTime = event.valueEvent;
                        }
                        value += event.valueEvent;
                    }
                } catch (error) {
                    console.error("Error fetching event:", error);
                }
            }

            const row = `
                <tr>
                    <td>${quotation.nameQuotation}</td>
                    <td>${team.name}</td>
                    <td>${firstTime}</td>
                    <td>${secondTime}</td>
                    <td>${value}</td>
                </tr>
            `;

            table.innerHTML += row;
        }
    }
}

// async function infoTeamMatch(matchId, teams) {
//     let temp = '';
//     const table = document.querySelector('#tableAnalyse tbody');
//     let team = '';
//     let quotationArr = [];
//     await quotationFetch.getAllQuotes()
//         .then(res => res.json())
//         .then(quotes => {
//             quotes.forEach(quotation => {
//                 quotationArr.push(quotation);
//             })
//         })
//     let i = 1;
//     let j = 0;
//     let t = 0;
//     while (t !== teams.length) {
//         let team = teams[t].name;
//         while (j !== quotationArr.length) {
//             let quotation = quotationArr[j].nameQuotation;
//             let value = 0;
//             let firstTime = 0;
//             let secondTime = 0;
//             while (i !== 3) {
//                 await eventFetch.findEventByMatchAndTeamAndQuotationAndPeriod(matchId, teams[t].id, quotationArr[j].id, i)
//                     .then(res => res.json())
//                     .then(event => {
//                         if (!event || Object.keys(event).length === 0) {
//
//                         } else {
//                             if (typeof event.valueEvent === "number") {
//                                 if (i === 1) {
//                                     firstTime = event.valueEvent;
//                                 } else if (i === 2) {
//                                     secondTime = event.valueEvent;
//                                 }
//                                 value += event.valueEvent;
//                             }
//                         }
//                     });
//                 i++;
//             }
//             i = 0;
//             j++;
//             temp += `
//                 <tr>
//                     <td>${quotation}</td>
//                     <td>${team}</td>
//                     <td>${firstTime}</td>
//                     <td>${secondTime}</td>
//                     <td>${value}</td>
//                 </tr>
//                 `;
//         }
//         j = 0;
//         t++;
//     }
//     table.innerHTML = temp;
// }


//                 return {
//                     quotation: quotation.nameQuotation,
//                     team: team.name,
//                     firstTime: firstTime,
//                     secondTime: secondTime,
//                     value: value
//                 };
//             }));
//         }));
//
//         const wholeData = allEventData.flat();
//         populateTable(wholeData);
//
//     } catch (error) {
//         console.error('Error fetching data:', error);
//     }
// }
//
// function populateTable(data) {
//     const table = document.querySelector('#tableAnalyse tbody');
//     table.innerHTML = '';
//
//     data.forEach(item => {
//         const row = document.createElement('tr');
//         row.innerHTML = `
//             <td>${item.quotation}</td>
//         <td>${item.team}</td>
//         <td>${item.firstTime}</td>
//         <td>${item.secondTime}</td>
//         <td>${item.value}</td>
//         `;
//         table.appendChild(row);
//     });
// }



async function infoMatch(matchId) {
    let temp = '';
    const info = document.querySelector('#infoMatch');
    await matchFetch.findOneMatch(matchId)
        .then(res => res.json())
        .then(match => {
            temp += `
             <span style="color: black">
             ${match.dateTimeMatch}
                <span style="color: slategray"> ${match.homeTeam.name}</span>
                - 
                <span style="color: slategray"> ${match.guestTeam.name}</span>
                </div>
            </span>
                </tr>
            `;
        });
    info.innerHTML = temp;
}