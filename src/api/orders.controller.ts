import {
  Body,
  Controller,
  Post,
  UseGuards,
} from '@nestjs/common';

import {
  ApiOperation,
  ApiSecurity,
  ApiTags,
} from '@nestjs/swagger';

import {
  SessionApiParam,
  WorkingSessionParam,
} from '@waha/nestjs/params/SessionApiParam';

import { WhatsappSession } from '@waha/core/abc/session.abc';

import { PoliciesGuard } from '@waha/core/auth/policies.guard';
import { CheckPolicies } from '@waha/core/auth/policies.decorator';
import { CanSession, FromParam } from '@waha/core/auth/policies';
import { Action } from '@waha/core/auth/casl.types';


class OrderDetailsRequest {
  orderId: string;
  token: string;
}


@ApiSecurity('api_key')
@Controller('api/:session/orders')
@ApiTags('🛒 Orders')
@UseGuards(PoliciesGuard)
export class OrdersController {

  @Post('details')
  @SessionApiParam
  @CheckPolicies(
    CanSession(Action.Read, FromParam('session')),
  )
  @ApiOperation({
    summary: 'Get catalogue order details',
  })
  async getOrderDetails(
    @WorkingSessionParam session: WhatsappSession,
    @Body() body: OrderDetailsRequest,
  ) {
    return session.getOrderDetails(
      body.orderId,
      body.token,
    );
  }
}
