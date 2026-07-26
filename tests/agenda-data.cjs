const fs = require("fs");
const vm = require("vm");
const crypto = require("crypto").webcrypto;

const oldDatabase = { version:1, settings:{goals:{}}, tasks:[{id:"old-task",title:"Tarefa antiga",area:"trabalho",subarea:"operacional"}], sessions:[{id:"old-session",startedAt:"2026-07-20T12:00:00.000Z",executedMinutes:30}], preferences:{} };
const storage = new Map([["proxima-acao-db",JSON.stringify(oldDatabase)]]);
const context = { console, crypto, structuredClone, Intl, Date, Math, localStorage:{getItem:key=>storage.get(key)||null,setItem:(key,value)=>storage.set(key,value),removeItem:key=>storage.delete(key)} };
vm.createContext(context);
["classic/constants.js","classic/models.js","classic/storage.js","classic/agenda.js"].forEach(file=>vm.runInContext(fs.readFileSync(file,"utf8"),context));

const result = vm.runInContext(`(() => {
  const database=loadDatabase();
  ensureAgendaData(database);
  const routineTest=runAgendaTests();
  const afterEnd=blocksForWeek(database,new Date("2026-09-07T12:00:00")).some(block=>block.title==="Fisioterapia");
  const exported=exportDatabase(database);
  return {version:database.version,taskResponsibility:database.tasks[0].responsibilityArea,sessionBlock:database.sessions[0].scheduleBlockId,hasCollections:Array.isArray(database.scheduleBlocks)&&Array.isArray(database.scheduleRecurrences)&&Array.isArray(database.maintenanceRoutines),routineTest,afterEnd,exportedAgenda:Array.isArray(exported.scheduleBlocks)&&!!exported.agendaSettings};
})()`, context);

if(result.version!==2||result.taskResponsibility!==null||result.sessionBlock!==null||!result.hasCollections||!result.routineTest.passed||result.afterEnd||!result.exportedAgenda) throw new Error(JSON.stringify(result));
console.log("agenda-data-ok",JSON.stringify(result));
