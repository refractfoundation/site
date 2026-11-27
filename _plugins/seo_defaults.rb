# frozen_string_literal: true

# Fills in SEO fields that jekyll-seo-tag reads but our front matter names differently,
# so pages don't have to repeat themselves:
#   image        from `cover` (posts) or `hero.photo` (events, programmes), looked up in
#                _data/photos.yml. Gives every such page an og:image and a large Twitter card.
#   description  from `summary` (events).
# Anything set explicitly in front matter wins. Pages with no photo of their own use
# `default_share_photo` from _config.yml; pages with no description use the site's.
Jekyll::Hooks.register [:pages, :documents], :pre_render do |doc, payload|
  # Documents expose their live data to Liquid, but plain pages hand Liquid a copy made
  # before this hook runs, so write to both.
  targets = [doc.data, payload["page"]].uniq.select { |t| t.respond_to?(:[]=) }
  data = doc.data
  photos = doc.site.data["photos"] || {}

  unless data["image"]
    key = data["cover"] || (data["hero"].is_a?(Hash) && data["hero"]["photo"]) ||
          doc.site.config["default_share_photo"]
    photo = key && photos[key]
    if photo
      image = {
        "path" => photo["file"],
        "width" => photo["w"],
        "height" => photo["h"],
        "alt" => photo["alt"],
      }
      targets.each { |t| t["image"] = image }
    end
  end

  if data["summary"] && !data["description"]
    targets.each { |t| t["description"] = data["summary"] }
  end
end
