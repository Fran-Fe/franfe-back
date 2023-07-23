import nodeSchedule from 'node-schedule';

export function jobGenerator(cron, job) {
  return nodeSchedule.scheduleJob(cron, () => {
    job();
  })
}
