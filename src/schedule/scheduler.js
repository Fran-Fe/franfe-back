import nodeSchedule from 'node-schedule';

// const job = nodeSchedule.scheduleJob('* * * * *', () => {
//   console.log('Running scheduler');
// })

export function jobGenerator(cron) {
  return nodeSchedule.scheduleJob(cron, () => {
    console.log('Running scheduler');
  })

}

