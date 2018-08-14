select h.hero_id, h.hero_name, h.hero_str, h.hero_def, h.hero_spd, h.extra_stats, h.gold, h.hero_exp, h.hero_level, r.name, c.name, c.picture
from heroes h
join races r ON h.hero_race = r.id
join classes c on h.hero_class = c.id
where user_id = $1