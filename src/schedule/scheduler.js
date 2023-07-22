import nodeSchedule from 'node-schedule';

export function jobGenerator(cron) {
  return nodeSchedule.scheduleJob(cron, () => {
    console.log('Running scheduler');
  })

}

