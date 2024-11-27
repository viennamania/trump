import { NextResponse, type NextRequest } from "next/server";

import {
	insertOneVerified,
} from '@lib/api/user';



export async function POST(request: NextRequest) {

  const body = await request.json();

  const { walletAddress, nickname, userType, telegramId, mobile, email } = body;



  const result = await insertOneVerified({
    walletAddress: walletAddress,
    nickname: nickname,
    usertype: userType,
    telegramId: telegramId,
    mobile: mobile,
    email: email,
  });


 
  return NextResponse.json({

    result,
    
  });
  
}
