import { Controller } from '@nestjs/common';

import { ChattingService } from './chatting.service';

@Controller('chatting')
export class ChattingController {
  constructor(private readonly chattingService: ChattingService) {}
}
