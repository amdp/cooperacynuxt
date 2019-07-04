<!-- <template>
  <div>
    <div><p class="base understanding center space up" v-if="this.$store.state.payment=='cancelled'">Subscription cancelled.<br><br>
    You have {{ this.$store.state.payment.days }} days left to join us!</p></div>
    <div v-else>
    <p class="base equivalence center space up">Step 2: the voluntary pooling<br><br></p>
    <p class="base">The Cooperacy membership is based on voluntary pooling. All of us send just one euro per month: the money is pooled to finance future ideas and projects, included yours. If you do not believe it, you can see what we've done with the money directly from the public paypal account: go to the standard paypal login and enter our account with COOPERATION + password cooperation2016.<br><br>

    If you don't like paypal, you can pool one year membership (12 euros) via bank transfer: our IBAN is IT61D0623001623000043225634 - Filiale AG 23 Milano Cariparma di via della Moscova.<br><br>

    If you are living in a low income country, you can pool with a lower amount if you help us adapt the amount to the different purchasing power of your nation.<br><br>

    <a target="_blank" href="{{asset('paypalpay')}}" class="btn btn-primary btn-block">VOLUNTARY POOLING THROUGH PAYPAL</a>
    
    <p class="mini">If you encounter any problem please screenshot any error and write us!</p><br><br>

    <p class="base">Pool instead via bank transfer sending us a code/receipt or contact us for suggestions, questions, requests:</p>
    <div role="form" class="wpcf7" id="wpcf7-f1303-p20-o1" lang="en-US" dir="ltr">

    <p class="mini">Your Name (required)<br />
    {{ Form::text('name', null, [
    'size' => 40,
    'class' => 'wpcf7-form-control wpcf7-text wpcf7-validates-as-required',
    'aria-required' => 'true',
    'aria-invalid' => 'false',]) }}</p>

    <p class="mini">Your Email (required)<br />
    <span class="wpcf7-form-control-wrap your-email">{{ Form::email('email', null, [
    'size' => 40,
    'class' => 'wpcf7-form-control wpcf7-text wpcf7-email wpcf7-validates-as-required wpcf7-validates-as-email',
    'aria-required' => 'true',
    'aria-invalid' => 'false',]) }}</span> </label></p>

    <p class="mini">Subject<br />
    <span class="wpcf7-form-control-wrap your-subject">{{ Form::text('subject', null, [
    'size' => 40,
    'class' => 'wpcf7-form-control wpcf7-text',
    'aria-invalid' => 'false',]) }}</span></p>

    <p class="mini">Your Message<br />
    <span class="wpcf7-form-control-wrap your-message">{{ Form::textarea('message', null, [
    'cols' => 40,
    'rows'=>10,
    'class' => 'wpcf7-form-control wpcf7-textarea',
    'aria-invalid' => 'false',]) }}</span></p>

    <p class="mini"><input type="submit" value="Send" class="wpcf7-form-control wpcf7-submit" /></p>
    <div class="wpcf7-response-output wpcf7-display-none"></div>

  </div><br>
</div>
  </div>
</template>

<script>
var paypal = require('paypal-rest-sdk');

export default {
  middleware: ['auth'],
  data(){return { emailLogin: '', passwordLogin: '',} },
  methods: { 
  }
  },
  computed: {

  },
}
</script>

<!--



namespace App\Http\Controllers;
use App\Http\Controllers\Controller;
use PayPal\Rest\ApiContext;
use PayPal\Auth\OAuthTokenCredential;
use PayPal\Api\Amount;
use PayPal\Api\Details;
use PayPal\Api\Item;
use PayPal\Api\ItemList;
use PayPal\Api\Payer;
use PayPal\Api\Payment;
use PayPal\Api\RedirectUrls;
use PayPal\Api\ExecutePayment;
use PayPal\Api\PaymentExecution;
use PayPal\Api\Transaction;
use PayPal\Api\ChargeModel;
use PayPal\Api\OverrideChargeModel;
use PayPal\Api\Currency;
use PayPal\Api\MerchantPreferences;
use PayPal\Api\PaymentDefinition;
use PayPal\Api\Plan;
use PayPal\Api\PatchRequest;
use PayPal\Api\Patch;
use PayPal\Api\Agreement;
use PayPal\Api\AgreementDetails;
use PayPal\Api\ShippingAddress;
use Illuminate\Support\Facades\Input;
use Session;
use Redirect;
use Auth;
use DB;

use Illuminate\Http\Request;

class PaypalController extends Controller
{
    private $_api_context;

    public function __construct()
    {
        //setup PayPal api context
        $paypal_conf = \Config::get('paypal');
        $this->_api_context = new ApiContext(new OAuthTokenCredential($paypal_conf['client_id'], $paypal_conf['secret']));
        $this->_api_context->setConfig($paypal_conf['settings']);
    }

    public function subscribe() {
      $plan = new Plan();
      // # Basic Information
      // Fill up the basic information that is required for the plan
      $plan->setName('Cooperacy subscription plan.')
            ->setDescription('Join Cooperacy and start doing awesome things together.')
            ->setType('INFINITE');
      # Payment definitions for this billing plan.
      $paymentDefinition = new PaymentDefinition();
      // The possible values for such setters are mentioned in the setter method documentation.
      // Just open the class file. e.g. lib/PayPal/Api/PaymentDefinition.php and look for setFrequency method.
      // You should be able to see the acceptable values in the comments.
      $paymentDefinition->setName('Regular Payments')
          ->setType('REGULAR')
          ->setFrequency('MONTH')
          ->setFrequencyInterval("1")
          ->setCycles("0")
          ->setAmount(new Currency(array('value' => 1.16, 'currency' => 'EUR')));
      // Charge Models
      $chargeModel = new ChargeModel();
      $chargeModel->setType('TAX')
          ->setAmount(new Currency(array('value' => 0, 'currency' => 'EUR')));
      $paymentDefinition->setChargeModels(array($chargeModel));
      $merchantPreferences = new MerchantPreferences();
      $baseUrl = url('/');

      // ReturnURL and CancelURL are not required and used when creating billing agreement with payment_method as "credit_card".
      // However, it is generally a good idea to set these values, in case you plan to create billing agreements which accepts "paypal" as payment_method.
      // This will keep your plan compatible with both the possible scenarios on how it is being used in agreement.
      $merchantPreferences->setReturnUrl($baseUrl."/thanks")
          ->setCancelUrl($baseUrl."/oops")
          ->setAutoBillAmount("yes")
          ->setInitialFailAmountAction("CONTINUE")
          ->setMaxFailAttempts("0")
          ->setSetupFee(new Currency(array('value' => 0, 'currency' => 'EUR')));
      $plan->setPaymentDefinitions(array($paymentDefinition));
      $plan->setMerchantPreferences($merchantPreferences);

      //For Sample Purposes Only.
      $request = clone $plan;
      ### Create Plan
      try {
          $output = $plan->create($this->_api_context);
      } catch (Exception $ex) {
        //  NOTE: PLEASE DO NOT USE RESULTPRINTER CLASS IN YOUR ORIGINAL CODE. FOR SAMPLE ONLY
         //ResultPrinter::printError("Created Plan", "Plan", null, $request, $ex);
          exit(1);
      }
      // NOTE: PLEASE DO NOT USE RESULTPRINTER CLASS IN YOUR ORIGINAL CODE. FOR SAMPLE ONLY
      //ResultPrinter::printResult("Created Plan", "Plan", $output->getId(), $request, $output);
      echo $output;

      $planId = $output->getId();

      $active = $plan->getState();
      echo $planId.'<br>';
      echo $active.'<br>';

      // PATCH PLAN, set state to ACTIVE
      try {
      $patch = new Patch();

      // $paymentDefinitions = $plan->getPaymentDefinitions();
      // $paymentDefinition = $paymentDefinitions[0];
      // $paymentDefinitionId = $paymentDefinition->getId();

      // $chargeModels = $paymentDefinition->getChargeModels();
      // $chargeModel = $chargeModels[0];
      // $chargeModelId = $chargeModel->getId();


      $patch->setOp('replace')
          ->setPath('/')
          ->setValue(json_decode(
              '{
                  "state": "ACTIVE"
              }'
          ));
      $patchRequest = new PatchRequest();
      $patchRequest->addPatch($patch);

      $plan->update($patchRequest, $this->_api_context);

      $updatedPlan = Plan::get($plan->getId(), $this->_api_context);

      } catch (Exception $ex) {
          //ResultPrinter::printError("Updated the Plan Payment Definition", "Plan", null, $patchRequest, $ex);
          exit(1);
      }

    //ResultPrinter::printResult("Updated the Plan Payment Definition", "Plan", $plan->getId(), $patchRequest, $plan);


    $updatedPlan = Plan::get($planId, $this->_api_context);
    return $updatedPlan;

    }

    public function pool() {
      $planId='P-2RD76633VR406933V27CMR3A';
      $atime = strtotime('+1 hour', time()); // PROBLEMA: controllare data server!
      $today = gmdate("Y-m-d\TH:i:s\Z", $atime);
      // CREATE BILLING AGREEMENT OBJECT
      $updatedPlan = Plan::get($planId, $this->_api_context);
      // Create new agreement
        $agreement = new Agreement();
        $agreement->setName($updatedPlan->name)
          ->setDescription($updatedPlan->description)
          ->setStartDate($today);



        $overrideChargeModel = new OverrideChargeModel();
        $overrideChargeModel->setChargeId('CHM-0X0167156X813701UUQFYDGA')
          ->setAmount(new Currency(array('value' => 0, 'currency' => 'EUR')));



        // Set plan id
        $plan = new Plan();

       $plan->setId($planId);

        $agreement->setPlan($plan);

        // Add payer type
        $payer = new Payer();
        $payer->setPaymentMethod('paypal');
        $payer->setPayerInfo(array('email'=>'paperino@paperopoli.com'));
        //$agreement->setOverrideChargeModels($overrideChargeModel);
        $agreement->setPayer($payer);

        //Adding shipping details
        // $shippingAddress = new ShippingAddress();
        // $shippingAddress->setLine1('111 First Street')
          // ->setCity('Saratoga')
          // ->setState('CA')
          // ->setPostalCode('95070')
          // ->setCountryCode('US');
        // $agreement->setShippingAddress($shippingAddress);
        echo $agreement;
        try {
        // Create agreement
        $agreement = $agreement->create($this->_api_context);

        // Extract approval URL to redirect user
        $approvalUrl = $agreement->getApprovalLink();

        } catch (PayPal\Exception\PayPalConnectionException $ex) {
          echo $ex->getCode();
          echo $ex->getData();
          die($ex);
        } catch (Exception $ex) {
        die($ex);
      }

      return redirect($approvalUrl);

    }

    public function confirm(Request $request) {

      $token = $request->token;

        $agreement = new \PayPal\Api\Agreement();

        try {
          // Execute agreement
          $agreement->execute($token, $this->_api_context);
        } catch (PayPal\Exception\PayPalConnectionException $ex) {
          echo $ex->getCode();
          echo $ex->getData();
          die($ex);
        } catch (Exception $ex) {
          die($ex);
        }

        $id = Auth::user()->id;
        $transaction_id = $agreement->id;
        $status = $agreement->state;
        $time = date("Y-m-d H:i:s");
        // Save ID in database
        if ($status == 'Active') {
          DB::table('users')->where('id', $id)->update(
          ['transaction_id' => $transaction_id,
          'transaction_state' => $status,
          'transaction_created_at' => $time,
          'member' => 1]);
        }

      return view('thanks', compact('agreement'));
    }


    public function getPaymentStatus() {

      $id = Auth::user()->id;
      $trans_id=DB::table('users')->where('id', $id)->pluck('transaction_id');
      $agreementId=$trans_id[0];
      try {
      $agreement = Agreement::get($agreementId, $this->_api_context);
      } catch (Exception $ex) {
      // NOTE: PLEASE DO NOT USE RESULTPRINTER CLASS IN YOUR ORIGINAL CODE. FOR SAMPLE ONLY
      // ResultPrinter::printError("Retrieved an Agreement", "Agreement", $agreement->getId(), $createdAgreement->getId(), $ex);
      exit(1);
      }
      // NOTE: PLEASE DO NOT USE RESULTPRINTER CLASS IN YOUR ORIGINAL CODE. FOR SAMPLE ONLY
      // ResultPrinter::printResult("Retrieved an Agreement", "Agreement", $agreement->getId(), $createdAgreement->getId(), $agreement);
      $state = $agreement->state;

      $last_payment_date = strtotime($agreement->getAgreementDetails()->getLastPaymentDate());
      $days_toend = 30 - floor((time() - $last_payment_date)/60/60/24);

      if ($state == "Active") {
        $message = "Your subscription is active";
      } else if ($state == "Cancelled") {

        if ($days_toend <= 0) {
          // not member, update DB
        } else {
          $message = "You have cancelled your subscription, you still have ".$days_toend." days left.";
        }

      }

      return $agreement;

      }


    public function getPlanList() {

      try {
      $params = array('page' => '0');
      $listplan= Plan::all($params, $this->_api_context);

      } catch (Exception $ex) {
      // NOTE: PLEASE DO NOT USE RESULTPRINTER CLASS IN YOUR ORIGINAL CODE. FOR SAMPLE ONLY
      // ResultPrinter::printError("Retrieved an Agreement", "Agreement", $agreement->getId(), $createdAgreement->getId(), $ex);
      exit(1);
      }

      return $listplan;

      }
} 
class PlanController extends Controller
{
    private $_api_context;

    public function __construct()
    {
        //setup PayPal api context
        $paypal_conf = \Config::get('paypal');
        $this->_api_context = new ApiContext(new OAuthTokenCredential($paypal_conf['client_id'], $paypal_conf['secret']));
        $this->_api_context->setConfig($paypal_conf['settings']);
    }

    /* CREATE SUBSCRIPTION PLAN*/
    public function createplan() {
      $plan = new Plan();
      // # Basic Information
      // Fill up the basic information that is required for the plan
      $plan->setName('Cooperacy subscription plan.')
            ->setDescription('Join Cooperacy and start doing awesome things together.')
            ->setType('INFINITE');
      # Payment definitions for this billing plan.
      $paymentDefinition = new PaymentDefinition();
      // The possible values for such setters are mentioned in the setter method documentation.
      // Just open the class file. e.g. lib/PayPal/Api/PaymentDefinition.php and look for setFrequency method.
      // You should be able to see the acceptable values in the comments.
      $paymentDefinition->setName('Regular Payments')
          ->setType('REGULAR')
          ->setFrequency('MONTH')
          ->setFrequencyInterval("1")
          ->setCycles("0")
          ->setAmount(new Currency(array('value' => 1.00, 'currency' => 'EUR')));
      // Charge Models
      $chargeModel = new ChargeModel();
      $chargeModel->setType('TAX')
          ->setAmount(new Currency(array('value' => 0, 'currency' => 'EUR')));
      $paymentDefinition->setChargeModels(array($chargeModel));
      $merchantPreferences = new MerchantPreferences();
      $baseUrl = url('/');

      // ReturnURL and CancelURL are not required and used when creating billing agreement with payment_method as "credit_card".
      // However, it is generally a good idea to set these values, in case you plan to create billing agreements which accepts "paypal" as payment_method.
      // This will keep your plan compatible with both the possible scenarios on how it is being used in agreement.
      $merchantPreferences->setReturnUrl($baseUrl."/thanks")
          ->setCancelUrl($baseUrl."/oops")
          ->setAutoBillAmount("yes")
          ->setInitialFailAmountAction("CONTINUE")
          ->setMaxFailAttempts("0")
          ->setSetupFee(new Currency(array('value' => 0, 'currency' => 'EUR')));
      $plan->setPaymentDefinitions(array($paymentDefinition));
      $plan->setMerchantPreferences($merchantPreferences);

      //For Sample Purposes Only.
      $request = clone $plan;
      ### Create Plan
      try {
          $output = $plan->create($this->_api_context);
      } catch (Exception $ex) {
        //  NOTE: PLEASE DO NOT USE RESULTPRINTER CLASS IN YOUR ORIGINAL CODE. FOR SAMPLE ONLY
         //ResultPrinter::printError("Created Plan", "Plan", null, $request, $ex);
          exit(1);
      }
      // NOTE: PLEASE DO NOT USE RESULTPRINTER CLASS IN YOUR ORIGINAL CODE. FOR SAMPLE ONLY
      //ResultPrinter::printResult("Created Plan", "Plan", $output->getId(), $request, $output);
      echo $output;

      $planId = $output->getId();

      $active = $plan->getState();
      echo $planId.'<br>';
      echo $active.'<br>';

      // PATCH PLAN, set state to ACTIVE
      try {
      $patch = new Patch();




      $patch->setOp('replace')
          ->setPath('/')
          ->setValue(json_decode(
              '{
                  "state": "ACTIVE"
              }'
          ));
      $patchRequest = new PatchRequest();
      $patchRequest->addPatch($patch);

      $plan->update($patchRequest, $this->_api_context);

      $updatedPlan = Plan::get($plan->getId(), $this->_api_context);

      } catch (Exception $ex) {
          //ResultPrinter::printError("Updated the Plan Payment Definition", "Plan", null, $patchRequest, $ex);
          exit(1);
      }

    //ResultPrinter::printResult("Updated the Plan Payment Definition", "Plan", $plan->getId(), $patchRequest, $plan);


    $updatedPlan = Plan::get($planId, $this->_api_context);
    $charge_id=$updatedPlan->payment_definitions[0]->charge_models[0]->id;
    DB::table('plans')->insert([
      'plan_id' => $updatedPlan->id,
      'status' => $updatedPlan->state,
      'charge_id' => $charge_id,
      ]);

      return redirect('createplan')->with('status', 'New subscription plan created');

    }

    /* PAY FOR LATEST SUBSCRIPTION */
    public function pool() {

      // Get registered plan info
      $planDesc=DB::table('plans')->where('status', 'ACTIVE')->orderBy('id', 'DESC')->first();// LIVE
      //$planDesc=DB::table('plans')->where('id', 17)->first(); // SANDBOX ONLY

      $email = Auth::user()->email;

      $atime = strtotime('+1 hour', time()); // PROBLEMA: controllare data server!
      $today = gmdate("Y-m-d\TH:i:s\Z", $atime);
      // CREATE BILLING AGREEMENT OBJECT


      $updatedPlan = Plan::get($planDesc->plan_id, $this->_api_context);
      // Create new agreement
        $agreement = new Agreement();
        $agreement->setName($updatedPlan->name)
          ->setDescription($updatedPlan->description)
          ->setStartDate($today);



        $overrideChargeModel = new OverrideChargeModel();
        $overrideChargeModel->setChargeId($planDesc->charge_id)
          ->setAmount(new Currency(array('value' => 0, 'currency' => 'EUR')));



        // Set plan id
        $plan = new Plan();

        $plan->setId($planDesc->plan_id);

        $agreement->setPlan($plan);

        // Add payer type
        $payer = new Payer();
        $payer->setPaymentMethod('paypal');
        $payer->setPayerInfo(array('email'=>$email));
        //$agreement->setOverrideChargeModels($overrideChargeModel);
        $agreement->setPayer($payer);

        echo $agreement;
        try {
        // Create agreement
        $agreement = $agreement->create($this->_api_context);

        // Extract approval URL to redirect user
        $approvalUrl = $agreement->getApprovalLink();

        } catch (PayPal\Exception\PayPalConnectionException $ex) {
          echo $ex->getCode();
          echo $ex->getData();
          die($ex);
        } catch (Exception $ex) {
        die($ex);
      }

      return redirect($approvalUrl);
  }

  public function confirm(Request $request) {

      $token = $request->token;

        $agreement = new \PayPal\Api\Agreement();

        try {
          // Execute agreement
          $agreement->execute($token, $this->_api_context);
        } catch (PayPal\Exception\PayPalConnectionException $ex) {
          echo $ex->getCode();
          echo $ex->getData();
          die($ex);
        } catch (Exception $ex) {
          die($ex);
        }

        $id = Auth::user()->id;
        $transaction_id = $agreement->id;
        $status = $agreement->state;
        $time = date("Y-m-d H:i:s");
        // Save ID in database
        if ($status == 'Active') {
          DB::table('users')->where('id', $id)->update(
          ['transaction_id' => $transaction_id,
          'transaction_state' => $status,
          'transaction_created_at' => $time,
          'updated_at' => $time,
          'member' => 1]);
        }

      Functions::notifyPayPalPayment();
      Functions::thanksUser();

      return view('thanks');
    }



-->