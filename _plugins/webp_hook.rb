# _plugins/webp_hook.rb
# Post-processes all HTML output to serve WebP images wherever possible.
#
# Two passes:
#   1. Wraps <img> tags in <picture> tags when a .webp version exists.
#   2. Replaces url() references in inline style attributes with .webp
#      when the .webp file exists — this covers heroes, event cards,
#      and any other CSS background-image powered by a custom property.
#
# Uses :site, :post_render so it runs after every page/document/post
# has been fully rendered with its layout applied.

def webp_exists?(src, site_source)
  return false if src.start_with?('http', 'data:')
  return false if src =~ /\.(svg|gif|webp)$/i

  webp_src = src.sub(/\.(jpe?g|png)$/i, '.webp')
  return false if webp_src == src

  full_path = File.join(site_source, webp_src.sub(%r{^/}, ''))
  File.exist?(full_path) ? webp_src : false
end

def process_img_tags(html, site_source)
  return html unless html.include?('<img')

  html.gsub(/<img([^>]*?)src="([^"]+?)"([^>]*?)>/) do
    before = $1
    src    = $2
    after  = $3

    webp_src = webp_exists?(src, site_source)
    if webp_src
      %(<picture><source srcset="#{webp_src}" type="image/webp" /><img#{before}src="#{src}"#{after}></picture>)
    else
      %(<img#{before}src="#{src}"#{after}>)
    end
  end
end

def process_style_urls(html, site_source)
  return html unless html.include?('url(')

  html.gsub(/url\(['"]?([^'"()]+\.(?:jpe?g|png))['"]?\)/i) do |match|
    src = $1
    webp_src = webp_exists?(src, site_source)
    if webp_src
      match.sub(src, webp_src)
    else
      match
    end
  end
end

Jekyll::Hooks.register :site, :post_render do |site|
  [site.pages, site.documents].each do |collection|
    collection.each do |item|
      next unless item.respond_to?(:output) && item.output.is_a?(String)

      html = item.output
      html = process_img_tags(html, site.source)
      html = process_style_urls(html, site.source)
      item.output = html
    end
  end
end
