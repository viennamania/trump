import { NextResponse, type NextRequest } from "next/server";

import {
	insertOneVerified,
} from '@lib/api/user';



export async function POST(request: NextRequest) {

  const body = await request.json();

  const { walletAddress, nickname, userType, telegramId, mobile, email } = body;


  if (!walletAddress || !nickname || !userType) {
    return NextResponse.json({
      message: 'missing required fields',
    }, {
      status: 400,
    });
  }


  const result = await insertOneVerified({
    walletAddress: walletAddress,
    nickname: nickname,
    userType: userType,
    telegramId: telegramId,
    mobile: mobile,
    email: email,
  });


 
  return NextResponse.json({

    result,
    
  });
  
}
