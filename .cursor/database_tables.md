# Database Table Design for Spring Read Together Hub

This document outlines the database schema for the Spring Read Together Hub application, based on the PRD and Software Architecture Document.

## Table of Contents
1.  [Roles](#roles)
2.  [Users](#users)
3.  [BoardTypes](#boardtypes)
4.  [Posts](#posts)
5.  [MaterialTypes](#materialtypes)
6.  [Materials](#materials)
7.  [Schedules](#schedules)
8.  [SudabangMessages](#sudabangmessages)
9.  [Comments](#comments)
10. [ReadBooks](#readbooks)
11. [IntroductionContent](#introductioncontent)
12. [RefreshTokens](#refreshtokens)

---

## 1. Roles
Stores the different user roles within the system.

| Column Name | Data Type     | Constraints                                                                             | Description                                          |
|-------------|---------------|-----------------------------------------------------------------------------------------|------------------------------------------------------|
| `role_id`   | SERIAL        | PRIMARY KEY                                                                             | Unique identifier for the role.                      |
| `role_name` | VARCHAR(50)   | UNIQUE, NOT NULL, CHECK (`role_name` IN ('Admin', 'Librarian', 'Member', 'PotentialMember')) | Name of the role (e.g., Admin, Librarian, Member, PotentialMember). |

---

## 2. Users
Stores information about registered users, including applicants.

| Column Name                     | Data Type                 | Constraints                                                                                                | Description                                                                                                |
|---------------------------------|---------------------------|------------------------------------------------------------------------------------------------------------|------------------------------------------------------------------------------------------------------------|
| `user_id`                       | SERIAL                    | PRIMARY KEY                                                                                                | Unique identifier for the user.                                                                            |
| `username`                      | VARCHAR(100)              | UNIQUE, NOT NULL                                                                                           | User's chosen ID, used for login.                                                                          |
| `password_hash`                 | VARCHAR(255)              | NOT NULL                                                                                                   | Hashed password (e.g., Argon2id hash of "test123" for users, "admin" for admin).                             |
| `name`                          | VARCHAR(100)              | NOT NULL                                                                                                   | User's real name (실명).                                                                                      |
| `email`                         | VARCHAR(255)              | UNIQUE, NOT NULL                                                                                           | User's email address.                                                                                      |
| `phone_number`                  | VARCHAR(20)               | NOT NULL                                                                                                   | User's phone number.                                                                                       |
| `role_id`                       | INTEGER                   | NOT NULL, REFERENCES `Roles`(`role_id`)                                                                    | Foreign key linking to the `Roles` table.                                                                  |
| `application_status`            | VARCHAR(20)               | NOT NULL DEFAULT 'pending_approval', CHECK (`application_status` IN ('pending_approval', 'approved', 'rejected')) | Status of their membership application (e.g., pending, approved, rejected).                              |
| `requested_librarian_role_on_application` | BOOLEAN           | NOT NULL DEFAULT FALSE                                                                                     | True if user applied for Librarian role, false if for Member role, during initial application. Cleared/ignored after approval. |
| `created_at`                    | TIMESTAMP WITH TIME ZONE  | DEFAULT CURRENT_TIMESTAMP                                                                                  | Timestamp of user creation.                                                                                |
| `updated_at`                    | TIMESTAMP WITH TIME ZONE  | DEFAULT CURRENT_TIMESTAMP                                                                                  | Timestamp of last user update.                                                                             |

*Notes:*
-   Admin user (`admin/admin`) will be pre-seeded with the 'Admin' role and 'approved' status.
-   New applicants are created with `role_id` for 'PotentialMember' and `application_status` = 'pending_approval'. If approved, `role_id` is updated to 'Member' or 'Librarian', and `application_status` to 'approved'.

---

## 3. BoardTypes
Stores categories for posts (e.g., general discussion, book reviews, announcements).

| Column Name     | Data Type     | Constraints        | Description                                  |
|-----------------|---------------|--------------------|----------------------------------------------|
| `board_type_id` | SERIAL        | PRIMARY KEY        | Unique identifier for the board type.        |
| `name`          | VARCHAR(100)  | UNIQUE, NOT NULL   | Name of the board type (e.g., "자유게시판", "독서후기", "공지사항"). |
| `description`   | TEXT          |                    | Optional description of the board type.      |

---

## 4. Posts
Stores posts made by users on different boards.

| Column Name     | Data Type                 | Constraints                               | Description                                  |
|-----------------|---------------------------|-------------------------------------------|----------------------------------------------|
| `post_id`       | SERIAL                    | PRIMARY KEY                               | Unique identifier for the post.              |
| `board_type_id` | INTEGER                   | NOT NULL, REFERENCES `BoardTypes`(`board_type_id`) | Foreign key linking to the `BoardTypes` table. |
| `user_id`       | INTEGER                   | NOT NULL, REFERENCES `Users`(`user_id`)   | Foreign key linking to the author (`Users`).   |
| `title`         | VARCHAR(255)              | NOT NULL                                  | Title of the post.                           |
| `content`       | TEXT                      | NOT NULL                                  | Content of the post.                         |
| `created_at`    | TIMESTAMP WITH TIME ZONE  | DEFAULT CURRENT_TIMESTAMP                 | Timestamp of post creation.                  |
| `updated_at`    | TIMESTAMP WITH TIME ZONE  | DEFAULT CURRENT_TIMESTAMP                 | Timestamp of last post update.               |

---

## 5. MaterialTypes
Stores categories for shared materials (e.g., document, image, video).

| Column Name        | Data Type     | Constraints        | Description                                     |
|--------------------|---------------|--------------------|-------------------------------------------------|
| `material_type_id` | SERIAL        | PRIMARY KEY        | Unique identifier for the material type.        |
| `name`             | VARCHAR(100)  | UNIQUE, NOT NULL   | Name of the material type (e.g., "document", "image", "video"). |

---

## 6. Materials
Stores information about shared files in the 자료실 (library/archive).

| Column Name           | Data Type                 | Constraints                                    | Description                                     |
|-----------------------|---------------------------|------------------------------------------------|-------------------------------------------------|
| `material_id`         | SERIAL                    | PRIMARY KEY                                    | Unique identifier for the material.             |
| `material_type_id`    | INTEGER                   | NOT NULL, REFERENCES `MaterialTypes`(`material_type_id`) | Foreign key linking to `MaterialTypes`.         |
| `uploader_user_id`    | INTEGER                   | NOT NULL, REFERENCES `Users`(`user_id`)        | Foreign key linking to the uploader (`Users`).  |
| `title`               | VARCHAR(255)              | NOT NULL                                       | Title of the material.                          |
| `description`         | TEXT                      |                                                | Optional description of the material.           |
| `file_url`            | VARCHAR(1024)             | NOT NULL                                       | URL of the file (e.g., from Supabase Storage).  |
| `file_size_bytes`     | BIGINT                    |                                                | Size of the file in bytes.                      |
| `original_file_name`  | VARCHAR(255)              |                                                | Original name of the uploaded file.             |
| `uploaded_at`         | TIMESTAMP WITH TIME ZONE  | DEFAULT CURRENT_TIMESTAMP                      | Timestamp of material upload.                   |

---

## 7. Schedules
Stores club schedules and events.

| Column Name           | Data Type                 | Constraints                               | Description                                        |
|-----------------------|---------------------------|-------------------------------------------|----------------------------------------------------|
| `schedule_id`         | SERIAL                    | PRIMARY KEY                               | Unique identifier for the schedule.                |
| `created_by_user_id`  | INTEGER                   | NOT NULL, REFERENCES `Users`(`user_id`)   | Foreign key linking to creator (`Users` - Admin/Librarian). |
| `title`               | VARCHAR(255)              | NOT NULL                                  | Title of the schedule/event.                       |
| `description`         | TEXT                      |                                           | Detailed description of the schedule.              |
| `start_datetime`      | TIMESTAMP WITH TIME ZONE  | NOT NULL                                  | Start date and time of the event.                  |
| `end_datetime`        | TIMESTAMP WITH TIME ZONE  |                                           | End date and time of the event (optional).         |
| `location`            | VARCHAR(255)              |                                           | Location of the event (optional).                  |
| `created_at`          | TIMESTAMP WITH TIME ZONE  | DEFAULT CURRENT_TIMESTAMP                 | Timestamp of schedule creation.                    |
| `updated_at`          | TIMESTAMP WITH TIME ZONE  | DEFAULT CURRENT_TIMESTAMP                 | Timestamp of last schedule update.                 |

---

## 8. SudabangMessages
Stores messages for the "수다방" (chat room like feature).

| Column Name   | Data Type                 | Constraints                               | Description                                  |
|---------------|---------------------------|-------------------------------------------|----------------------------------------------|
| `message_id`  | SERIAL                    | PRIMARY KEY                               | Unique identifier for the message.           |
| `user_id`     | INTEGER                   | NOT NULL, REFERENCES `Users`(`user_id`)   | Foreign key linking to the author (`Users`).   |
| `content`     | TEXT                      | NOT NULL                                  | Content of the message (3-line limit enforced by app). |
| `created_at`  | TIMESTAMP WITH TIME ZONE  | DEFAULT CURRENT_TIMESTAMP                 | Timestamp of message creation.               |
| `updated_at`  | TIMESTAMP WITH TIME ZONE  | DEFAULT CURRENT_TIMESTAMP                 | Timestamp of last message update.            |

---

## 9. Comments
Stores comments made on posts or Sudabang messages.

| Column Name                   | Data Type                 | Constraints                               | Description                                      |
|-------------------------------|---------------------------|-------------------------------------------|--------------------------------------------------|
| `comment_id`                  | SERIAL                    | PRIMARY KEY                               | Unique identifier for the comment.               |
| `user_id`                     | INTEGER                   | NOT NULL, REFERENCES `Users`(`user_id`)   | Foreign key linking to the author (`Users`).       |
| `parent_post_id`              | INTEGER                   | REFERENCES `Posts`(`post_id`), NULLABLE   | FK to `Posts` if comment is on a post.           |
| `parent_sudabang_message_id`  | INTEGER                   | REFERENCES `SudabangMessages`(`message_id`), NULLABLE | FK to `SudabangMessages` if comment is on a message. |
| `content`                     | TEXT                      | NOT NULL                                  | Content of the comment.                          |
| `created_at`                  | TIMESTAMP WITH TIME ZONE  | DEFAULT CURRENT_TIMESTAMP                 | Timestamp of comment creation.                   |
| `updated_at`                  | TIMESTAMP WITH TIME ZONE  | DEFAULT CURRENT_TIMESTAMP                 | Timestamp of last comment update.                |

*Constraint Check:* `CHECK (parent_post_id IS NOT NULL OR parent_sudabang_message_id IS NOT NULL)` - A comment must belong to either a post or a Sudabang message.
(Alternatively, `CHECK ((parent_post_id IS NOT NULL AND parent_sudabang_message_id IS NULL) OR (parent_post_id IS NULL AND parent_sudabang_message_id IS NOT NULL))`)

---

## 10. ReadBooks
Stores information about books the club has read, for display on the introduction page.

| Column Name         | Data Type                 | Constraints                               | Description                                   |
|---------------------|---------------------------|-------------------------------------------|-----------------------------------------------|
| `read_book_id`      | SERIAL                    | PRIMARY KEY                               | Unique identifier for the read book entry.    |
| `title`             | VARCHAR(255)              | NOT NULL                                  | Title of the book.                            |
| `author`            | VARCHAR(255)              |                                           | Author of the book.                           |
| `cover_image_url`   | VARCHAR(1024)             |                                           | URL for the book's cover image.               |
| `description`       | TEXT                      |                                           | Optional short description or club's thoughts. |
| `date_read`         | DATE                      |                                           | Date (or month/year) the club read the book (optional). |
| `added_by_user_id`  | INTEGER                   | NOT NULL, REFERENCES `Users`(`user_id`)   | Foreign key linking to user who added entry (`Users` - Admin/Librarian). |
| `added_at`          | TIMESTAMP WITH TIME ZONE  | DEFAULT CURRENT_TIMESTAMP                 | Timestamp when the entry was added.           |

---

## 11. IntroductionContent
Stores editable content snippets for the club's introduction page.

| Column Name     | Data Type                 | Constraints               | Description                                                       |
|-----------------|---------------------------|---------------------------|-------------------------------------------------------------------|
| `content_id`    | SERIAL                    | PRIMARY KEY               | Unique identifier for the content snippet.                        |
| `section_key`   | VARCHAR(100)              | UNIQUE, NOT NULL          | Key to identify the content (e.g., "club_description_text", "main_photo_material_id"). |
| `content_value` | TEXT                      | NOT NULL                  | The actual content value for the key.                             |
| `updated_at`    | TIMESTAMP WITH TIME ZONE  | DEFAULT CURRENT_TIMESTAMP | Timestamp of last content update.                                 |

---

## 12. RefreshTokens
Stores JWT refresh tokens for persistent user sessions.

| Column Name  | Data Type                 | Constraints                               | Description                                      |
|--------------|---------------------------|-------------------------------------------|--------------------------------------------------|
| `token_id`   | SERIAL                    | PRIMARY KEY                               | Unique identifier for the stored token record.   |
| `user_id`    | INTEGER                   | NOT NULL, REFERENCES `Users`(`user_id`)   | Foreign key linking to the user.                 |
| `token_hash` | VARCHAR(255)              | UNIQUE, NOT NULL                          | Hashed version of the refresh token.             |
| `expires_at` | TIMESTAMP WITH TIME ZONE  | NOT NULL                                  | Expiry timestamp of the refresh token.           |
| `created_at` | TIMESTAMP WITH TIME ZONE  | DEFAULT CURRENT_TIMESTAMP                 | Timestamp when the token was issued/stored.      |
| `is_revoked` | BOOLEAN                   | NOT NULL DEFAULT FALSE                    | Flag to indicate if the token has been revoked.  |


</rewritten_file> 