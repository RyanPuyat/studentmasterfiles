const postQuery = (req) => {
  const { fname, lname, studentemail, course } = req.body;

  const text =
    'INSERT INTO student_tb(fname, lname, studentemail, course) VALUES ($1, $2, $3, $4) RETURNING *';
  const params = [fname, lname, studentemail, course];

  return { text, params };
};

// const getQuery = () => {
//   const text = 'SELECT * FROM student_tb';
//   return { text, params: [] };
// };

const getQuery = (page = 1, limit = 5, search = '') => {
  const offset = (page - 1) * limit;
  const text = `
    SELECT * FROM student_tb 
    WHERE id::text ILIKE $1 
    OR fname ILIKE $1 
    OR lname ILIKE $1 
    ORDER BY id 
    LIMIT $2 OFFSET $3
  `;
  const params = [`%${search}%`, limit, offset];
  return { text, params };
};

const getQueryById = (id) => {
  const text = 'SELECT * FROM student_tb WHERE id = $1';
  const params = [id];

  return { text, params };
};

const deleteQuery = (id) => {
  const text = 'DELETE FROM student_tb WHERE id = $1 RETURNING *';
  const params = [id];

  return { text, params };
};

const updateQuery = ({ id, fname, lname, studentemail, course }) => {
  const text =
    'UPDATE student_tb SET fname = $1, lname = $2, studentemail = $3, course = $4 WHERE id = $5 RETURNING *';
  const params = [fname, lname, studentemail, course, id];

  return { text, params };
};

const countQuery = (search = '') => {
  const text = `
    SELECT COUNT(*) FROM student_tb 
    WHERE id::text ILIKE $1 
    OR fname ILIKE $1 
    OR lname ILIKE $1
  `;
  const params = [`%${search}%`];
  return { text, params };
};

module.exports = {
  postQuery,
  getQuery,
  countQuery,
  getQueryById,
  deleteQuery,
  updateQuery,
};
