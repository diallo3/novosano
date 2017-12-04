<script language="javascript">

   var fpub_delay = <?= is_numeric(get_option('fpub_delay')) ? get_option('fpub_delay') : 0; ?>;
   var fpub_persist = <?= is_numeric(get_option('fpub_persist')) ? get_option('fpub_persist') : 0; ?>;

</script>

<div id="fpub-popup" class="trg-overlay hide small" style="background-color: <?= hex2rgba(get_option('fpub_background_colr'), get_option('fpub_background_fade') / 100); ?>; border-top: <?= get_option('fpub_border_height') > 0 ? get_option('fpub_border_height') . 'px' : '1px'; ?> solid <?= get_option('fpub_line_color'); ?>">
   <?php if (get_option('fpub_btn_close') == 'on') : ?>
      <img src="<?= plugins_url('images/close.png', dirname(__FILE__)); ?>" class="close-overlay" />
   <?php endif; ?>
   
      <a href="<?= get_option('fpub_link'); ?>" <?= get_option('fpub_blank') == 'on' ? 'target="_blank"' : '' ?> >
      <img src="<?= get_option('fpub_image'); ?>" height="<?= get_option('fpub_height') > 0 ? get_option('fpub_height') . 'px' : ''; ?>" width="<?= get_option('fpub_width') > 0 ? get_option('fpub_width') . 'px' : ''; ?>" />
   </a>
</div>