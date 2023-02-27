const User = require('../Model/userModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

//User Route
exports.getAllUsers = catchAsync(async (req, res) => {
  const user = await User.find();

  res.status(200).json({
    result: user.length,
    status: 'success',
    data: {
      user,
    },
  });
});

exports.createUser = async (req, res, next) => {
  try {
    const newUser = await User.create(req.body);

    res.json({
      status: 'success',
      data: {
        user: newUser,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.getUser = async (req, res) => {
  const user = await User.findById(req.params.id);
  res.json({
    status: 'success',
    data: {
      user,
    },
  });
};

exports.updateUser = catchAsync(async (req, res, next) => {
  const user = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!user) {
    return next(new AppError('No user found with that ID', 404));
  }

  res.json({
    status: 'success',
    data: {
      user,
    },
  });
});

exports.deleteUser = catchAsync(async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.json({
    status: 'success',
    data: {
      message: 'user deleted successfully',
    },
  });
});
