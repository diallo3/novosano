<!-- Live Preview -->
<div id="fpub-popup" class="trg-overlay hide small" style="display:none;">
      <img src="<?= plugins_url('images/close.png', dirname(__FILE__)); ?>" class="close-overlay" />
   
      <a  id="fpb-link-live-view" href="" <?= get_option('fpub_blank') == 'on' ? 'target="_blank"' : '' ?> >
      <img id="fpb-img-live-view" src="" height="" width="" />
   </a>
</div>
<!-- End Live Preview -->