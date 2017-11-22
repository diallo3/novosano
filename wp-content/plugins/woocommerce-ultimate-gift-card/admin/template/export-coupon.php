<div class="mwb_table">
<table class="form-table mwb_wgm_general_setting">
	<tbody>
		<tr valign="top">
			<th scope="row" class="titledesc">
				<label for="mwb_wugc_export_coupon"><?php _e('Export Online Coupons Details', 'woocommerce-ultimate-gift-card')?></label>
			</th>
			<td class="forminp forminp-text">
				<?php 
				$attribute_description = __('You can export csv report of all the generated coupons from the orders.', 'woocommerce-ultimate-gift-card');
				echo wc_help_tip( $attribute_description );
				
				?>
				<a href="admin.php?page=mwb-wgc-setting&mwb_wugc_export_csv=mwb_woo_gift_card_report" class="button-primary" target="_blank"><?php _e("Export CSV",'woocommerce-ultimate-gift-card');?> </a>	
			</td>
		</tr>
		<tr valign="top">
			<th scope="row" class="titledesc">
				<label for="mwb_wugc_export_coupon"><?php _e('Export Offline Coupons Details', 'woocommerce-ultimate-gift-card')?></label>
			</th>
			<td class="forminp forminp-text">
				<?php 
				$attribute_description = __('You can export all the offline generated coupons from the orders.', 'woocommerce-ultimate-gift-card');
				echo wc_help_tip( $attribute_description );
				?>
				<a href="admin.php?page=mwb-wgc-setting&mwb_wugc_export_csv=mwb_woo_offline_gift_card_report" class="button-primary" target="_blank"><?php _e("Export CSV",'woocommerce-ultimate-gift-card');?> </a>	
			</td>
		</tr>
	</tbody>
</table>
</div>