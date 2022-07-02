CREATE OR REPLACE FUNCTION update_likes() RETURNS TRIGGER AS $update_likes$
-- update total likes of a post from posts table
DECLARE
	_post_id integer;
	_current_likes integer;
	_new_likes integer;
BEGIN
	SELECT COALESCE(OLD.post_id, NEW.post_id) INTO _post_id;
  SELECT likes INTO _current_likes FROM posts WHERE post_id = _post_id;
	
	IF (TG_OP = 'INSERT') THEN
		SELECT NEW.post_id INTO _post_id;
		SELECT (_current_likes + 1) INTO _new_likes;
	ELSIF (TG_OP = 'DELETE') THEN
		SELECT OLD.post_id INTO _post_id;
		SELECT (_current_likes - 1) INTO _new_likes;
	END IF;
	
	UPDATE posts
	SET likes = _new_likes
	WHERE post_id = _post_id;
	
	RETURN NULL;
END;
$update_likes$ LANGUAGE plpgsql;

CREATE OR REPLACE TRIGGER update_likes AFTER INSERT OR DELETE ON likes
	FOR EACH ROW EXECUTE FUNCTION update_likes();