CREATE OR REPLACE FUNCTION update_likes_dislikes() RETURNS TRIGGER AS $update_likes_dislikes$
-- update total likes and dislikes of a post from the posts table
DECLARE
	_post_id			integer;
	_current_likes		integer;
	_new_likes			integer;
	_current_dislikes	integer;
	_new_dislikes		integer;
BEGIN
	SELECT NEW.post_id INTO _post_id; 
	SELECT likes INTO _current_likes FROM posts WHERE post_id = NEW.post_id; 
	SELECT dislikes INTO _current_dislikes FROM posts WHERE post_id = NEW.post_id;

	IF (OLD.liked = NEW.liked AND OLD.disliked = NEW.disliked) THEN
		RETURN NULL;
	END IF;

	IF TG_OP = 'INSERT' OR (TG_OP = 'UPDATE' AND OLD.liked = false AND OLD.disliked = false) THEN
		IF (NEW.liked = true) THEN
			SELECT (_current_likes + 1) INTO _new_likes;
			SELECT _current_dislikes INTO _new_dislikes;
		ELSIF (NEW.disliked = true) THEN
			SELECT (_current_dislikes + 1) INTO _new_dislikes;
			SELECT _current_likes INTO _new_likes;
		END IF;
	ELSIF (TG_OP = 'UPDATE') THEN
		IF (OLD.liked = true AND OLD.disliked = false) THEN
			SELECT (_current_likes - 1) INTO _new_likes;
			IF (NEW.liked = false AND NEW.disliked = false) THEN
				SELECT _current_dislikes INTO _new_dislikes;
			ELSIF (NEW.liked = false AND NEW.disliked = true) THEN
				SELECT (_current_dislikes + 1) INTO _new_dislikes;
			END IF;
		ELSIF (OLD.liked = false AND OLD.disliked = true) THEN
			SELECT (_current_dislikes - 1) INTO _new_dislikes;
			IF (NEW.liked = false AND NEW.disliked = false) THEN
				SELECT _current_likes INTO _new_likes;
			ELSIF (NEW.liked = true AND NEW.disliked = false) THEN
				SELECT (_current_likes + 1) INTO _new_likes;
			END IF;
		END IF;
	END IF;

	UPDATE posts
	SET likes = _new_likes,
		dislikes = _new_dislikes
	WHERE post_id = _post_id;
		
	RETURN NULL;	
END; 
$update_likes_dislikes$ LANGUAGE plpgsql;

CREATE TRIGGER update_likes_dislikes AFTER INSERT OR UPDATE ON ratings
	FOR EACH ROW EXECUTE FUNCTION update_likes_dislikes();