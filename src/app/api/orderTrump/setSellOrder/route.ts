import { NextResponse, type NextRequest } from "next/server";

import {
	insertSellOrder,
} from '@lib/api/orderTrump';



export async function POST(request: NextRequest) {

  const body = await request.json();

  const { walletAddress, trumpAmount, fietAmount, fietCurrency, rate, payment, privateSale } = body;

  console.log("setSellOrder walletAddress", walletAddress);
  

  const result = await insertSellOrder({
    walletAddress: walletAddress,
    trumpAmount: trumpAmount,
    fietAmount: fietAmount,
    fietCurrency: fietCurrency,
    rate: rate,
    payment: payment,
    privateSale: privateSale,
  });


 
  return NextResponse.json({

    result,
    
  });
  
}
