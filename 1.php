<?php
public function dailyreportexportAction(){
		$from_date = $_POST['from_date'];
		if($_POST['to_date'] != ''){
			$to_date = $_POST['to_date'].' 23:59:59';
		}else{
			$to_date = date('Y-m-d').' 23:59:59';
		}

		$from_date = date('Y-m-d H:i:s', strtotime($from_date));
		$to_date = date('Y-m-d H:i:s', strtotime($to_date));
		$orders_collection = Mage::getModel('sales/order')->getCollection()->addFieldToSelect(array('status','created_at','grand_total','first_time_order'))
		->addFieldToFilter('status',array('in'=>array('confirmed','processing','shipped','payment_success','complete','completed','closed')))
		->addFieldToFilter('first_time_order',array('in'=>array('no','yes')))
		->addAttributeToFilter('created_at', array('from'=>$from_date, 'to'=>$to_date))
		->addAttributeToSort('created_at','desc');
		$orders_data = $orders_collection->getData();
		$response = array();
		foreach ($orders_data as $key => $order){
			$orderDate = new DateTime(date('Y-m-d H:i:s',strtotime($order['created_at'])));
			$key=$orderDate->format('Y-m-d');
			
			if(strcasecmp($order['first_time_order'],'yes') == 0){
				$firstTime = 1;
			}else if(strcasecmp($order['first_time_order'],'no') == 0){
				$firstTime = 2;
			}else{
				$firstTime = 0;
			}

			if(isset($response[$key]['order_month'])){
				switch($firstTime){
					case 1:
						$response[$key]['order_first_time'] += 1;
						$response[$key]['order_revenue_first_time'] += $order['grand_total'];
						break;
					case 2:
						$response[$key]['order_repeat'] += 1;
						$response[$key]['order_revenue_repeat']+= $order['grand_total'];
						break;
					default:
						$response[$key]['order_other'] += 1;
						$response[$key]['order_revenue_other'] += $order['grand_total'];
						break;
				}
				$response[$key]['order_revenue'] += $order['grand_total'];
				$response[$key]['order_total_count'] += 1;
			}else{
				$response[$key]['order_month'] = $orderDate->format('M Y');
				$response[$key]['order_date'] = $orderDate->format('d');
				$response[$key]['order_first_time'] = 0;
				$response[$key]['order_repeat'] = 0;
				$response[$key]['order_other'] = 0;
				$response[$key]['order_total_count'] = 0;
				$response[$key]['order_revenue_first_time'] = 0;
				$response[$key]['order_revenue_repeat'] = 0;
				$response[$key]['order_revenue_other'] = 0;
				$response[$key]['order_revenue'] = 0;
				switch($firstTime){
					case 1:
						$response[$key]['order_first_time'] = 1;
						$response[$key]['order_revenue_first_time'] += $order['grand_total'];
						break;
					case 2:
						$response[$key]['order_repeat'] = 1;
						$response[$key]['order_revenue_repeat']+= $order['grand_total'];
						break;
					default:
						$response[$key]['order_other'] = 1;
						$response[$key]['order_revenue_other'] += $order['grand_total'];
						break;
				}
				$response[$key]['order_revenue'] += $order['grand_total'];
				$response[$key]['order_total_count'] = 1;
        }
    }
    $output = fopen("php://output",'w') or die("Can't open php://output");
    header("Content-Type:application/csv"); 
    header("Content-Disposition:attachment;filename=Daily_Report.csv"); 
    fputcsv($output,array('Month','Date','First Time Orders','Repeated Orders','Other Orders','Total Orders','First Time Orders Revenue','Repeated Orders Revenue','Other Orders Revenue','Total Revenue'));
    foreach($response as $value) {
        $value = array_values($value);
        $value = array_merge(array(' '),$value);
        fputcsv($output, $value);	
    }
}