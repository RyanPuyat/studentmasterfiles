const express = require('express');
const router = express.Router();
const query = require('../config/db');
const {
  postQuery,
  getQuery,
  getQueryById,
  deleteQuery,
  updateQuery,
  countQuery,
} = require('../services/queryHelper');

router.post('/', async (req, res) => {
  const { text, params } = postQuery(req);

  try {
    const newData = await query(text, params);
    res.json({ success: true, data: newData.rows[0] });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error: 'Something went wrong' });
  }
});

router.get('/', async (req, res) => {
  const { page = 1, limit = 100, search = '' } = req.query;

  try {
    const { text, params } = getQuery(page, limit, search);
    const { text: countText, params: countParams } = countQuery(search);

    const allData = await query(text, params);
    const countResult = await query(countText, countParams);
    const totalRows = parseInt(countResult.rows[0].count);
    const totalPages = Math.ceil(totalRows / limit);

    res.json({
      success: true,
      data: allData.rows,
      currentPage: parseInt(page),
      totalPages,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error: 'Something went wrong' });
  }
});

//get the id
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const { text, params } = getQueryById(id);

  try {
    const dataId = await query(text, params);
    res.json({ success: true, data: dataId.rows });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error: 'Something went wrong' });
  }
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const { text, params } = deleteQuery(id);

  try {
    const delData = await query(text, params);
    res.json({ sucess: true, data: delData.rows });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, data: 'Something went wrong' });
  }
});

router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { fname, lname, studentemail, course } = req.body;
  const studentData = { id, fname, lname, studentemail, course };

  const { text, params } = updateQuery(studentData);

  try {
    const updateData = await query(text, params);
    res.json({ success: true, data: updateData.rows[0] });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error: 'Something went wrong' });
  }
});

module.exports = router;
