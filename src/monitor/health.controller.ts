import { Controller, Get, HttpException, HttpStatus } from '@nestjs/common';
import { HealthCheckService, HealthCheck,TypeOrmHealthIndicator,
    MemoryHealthIndicator,
    DiskHealthIndicator,
} from '@nestjs/terminus';
 
@Controller('health')
class HealthController {
  constructor(
    private health: HealthCheckService,
    private typeOrmHealthIndicator: TypeOrmHealthIndicator,
    private memoryHealthIndicator: MemoryHealthIndicator,
    private diskHealthIndicator: DiskHealthIndicator
  ) {}
 
  @Get()
  @HealthCheck()
  async  check() {
       try{
       const healthCheckResult = await this.health.check([
        // The databasse should be running
        () => this.typeOrmHealthIndicator.pingCheck('database'),
        // the process should not use more than 300MB memory
        () => this.memoryHealthIndicator.checkHeap('memory heap', 300 * 1024 * 1024),
        // The process should not have more than 300MB RSS memory allocated
        () => this.memoryHealthIndicator.checkRSS('memory RSS', 300 * 1024 * 1024),
        // the used disk storage should not exceed the 50% of the available space
        () => this.diskHealthIndicator.checkStorage('disk health', {
          thresholdPercent: 0.5, path: '/'
        })        
    ]);
    const isHealthy = healthCheckResult.status === 'ok';
    if (isHealthy) {
        return healthCheckResult;
    } else {
        // Handle the specific service that is down
       // let failedService: { key: string; status: string } | undefined;
 
        let failedService = Object.values(healthCheckResult.details).find((entry)=>{entry.status!=='up'});

        
        if (failedService) {
            //const errorMessage = `Service ${failedService.key} is down`;
            throw new HttpException(healthCheckResult, HttpStatus.SERVICE_UNAVAILABLE);
        }
        
    }
   }
   catch (error)
   {
     throw new HttpException(error,HttpStatus.SERVICE_UNAVAILABLE);
   }    
  }
}
 
export default HealthController;