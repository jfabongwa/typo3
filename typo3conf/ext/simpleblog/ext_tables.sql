CREATE TABLE tx_simpleblog_domain_model_blog (
	title varchar(255) NOT NULL DEFAULT '',
	description text NOT NULL DEFAULT '',
	image int(11) unsigned NOT NULL DEFAULT '0',
	posts int(11) unsigned NOT NULL DEFAULT '0'
);

CREATE TABLE tx_simpleblog_domain_model_post (
	blog int(11) unsigned DEFAULT '0' NOT NULL,
	title varchar(255) NOT NULL DEFAULT '',
	content text NOT NULL DEFAULT '',
	postdate int(11) NOT NULL DEFAULT '0',
	comments int(11) unsigned NOT NULL DEFAULT '0',
	author int(11) unsigned DEFAULT '0',
	tags int(11) unsigned NOT NULL DEFAULT '0'
);

CREATE TABLE tx_simpleblog_domain_model_comment (
	post int(11) unsigned DEFAULT '0' NOT NULL,
	comment text NOT NULL DEFAULT '',
	commentdate int(11) NOT NULL DEFAULT '0'
);

CREATE TABLE tx_simpleblog_domain_model_author (
	fullname varchar(255) NOT NULL DEFAULT '',
	email varchar(255) NOT NULL DEFAULT ''
);

CREATE TABLE tx_simpleblog_domain_model_tag (
	tag_value varchar(255) NOT NULL DEFAULT ''
);
