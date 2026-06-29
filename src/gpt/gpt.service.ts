import { Injectable } from '@nestjs/common';

import { orthographyCheckUseCase } from './use-cases';
import { OrthographyDto } from './dtos';
import { OpenAI } from 'openai';

@Injectable()
export class GptService {
  private readonly openai: OpenAI = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  // Just call use cases
  async orthographyCheck(orthographyDto: OrthographyDto) {
    return await orthographyCheckUseCase(this.openai, {
      prompt: orthographyDto.prompt,
    });
  }
}
