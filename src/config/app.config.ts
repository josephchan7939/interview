import { env, envNum } from "@/helper/config";
import { registerAs } from "@nestjs/config";


export const app = registerAs('app',() => ({
   name:env('APPName','Interview challenge'),
   description:env('APPDesc','Implementation for the interview challenge'),
   port:envNum('PORT',3000),
   globalPrefix:env('GlobalPrefix','v1'),
   apiversion:env('apiversion','1.0'),
   logger: {
      level: env('LOGGER_LEVEL','verbose'),
      maxFiles: envNum('LOGGER_MAX_FILES',31),
    },
}));

export type IAppConfig = ReturnType<typeof app>;