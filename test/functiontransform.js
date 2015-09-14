LocalFlexibleRequest request = new LocalFlexibleRequest();
request.setKey(PROJECT_KEY); // Put project key here
request.setUid(USER_ID); // User ID (email or username)
request.setWidget(WIDGET_TYPE); // Widget key, obtained from Widget settings in PW site
// Could be ApiType.VIRTUAL_CURRENCY, ApiType.CART or ApiType.ApiType.DIGITAL_GOODS
request.setApiType(ApiType.DIGITAL_GOODS);
request.setAmount(0.01f); // Payment amount
request.setCurrencycode("USD"); // Currency code
request.setAgName(ITEM_NAME); // Product name
request.setAgExternalId(ITEM_ID); // Product id in your system
request.setSecretKey(SECRET_KEY);
request.setSignVersion(3);
request.setAgType("fixed");

Intent intent = new Intent(getApplicationContext(), PwLocalActivity.class);
intent.putExtra(Key.PAYMENT_TYPE, PaymentMethod.PW_LOCAL_FLEXIBLE);
intent.putExtra(Key.REQUEST_MESSAGE, request);
startActivityForResult(intent, PwLocalActivity.REQUEST_CODE);

public static void requestPay(String USER_ID,String WIDGET_TYPE,float amount,String currency,String ITEM_NAME,String ITEM_ID)
 {
  LocalFlexibleRequest request = new LocalFlexibleRequest();
  request.setKey(PROJECT_KEY); // Put project key here
  request.setUid(USER_ID); // User ID (email or username)
  request.setWidget(WIDGET_TYPE); // Widget key, obtained from Widget settings in PW site
  // Could be ApiType.VIRTUAL_CURRENCY, ApiType.CART or ApiType.ApiType.DIGITAL_GOODS
  request.setApiType(ApiType.DIGITAL_GOODS);
  request.setAmount(amount); // Payment amount
  request.setCurrencycode(currency); // Currency code
  request.setAgName(ITEM_NAME); // Product name
  request.setAgExternalId(ITEM_ID); // Product id in your system
  request.setSecretKey(SECRET_KEY);
  request.setSignVersion(2);
  request.setAgType("fixed");
  Intent intent = new Intent(mContext, PwLocalActivity.class);
  intent.putExtra(Key.PAYMENT_TYPE, PaymentMethod.PW_LOCAL_FLEXIBLE);
  intent.putExtra(Key.REQUEST_MESSAGE, (Parcelable)request);
  ((Activity)mContext).startActivityForResult(intent, PwLocalActivity.REQUEST_CODE);
 }
