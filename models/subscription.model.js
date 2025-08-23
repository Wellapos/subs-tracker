import mongoose from 'mongoose'

const subscriptionSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Subscription name is required'],
      trim: true,
      minLength: [3, 'Subscription name must be at least 3 characters long'],
      maxLength: [100, 'Subscription name must be at most 100 characters long']
    },
    price: {
      type: Number,
      required: [true, 'Subscription price is required'],
      min: [0, 'Subscription price must be a positive number']
    },
    currency: {
      type: String,
      required: [true, 'Currency is required'],
      enum: ['USD', 'BRL'],
      default: 'BRL'
    },
    frequency: {
      type: String,
      enum: ['daily', 'weekly', 'monthly', 'yearly'],
      default: 'monthly'
    },
    category: {
      type: String,
      enum: [
        'entertainment',
        'utilities',
        'software',
        'health',
        'education',
        'other'
      ],
      default: 'other',
      required: [true, 'Category is required']
    },
    paymentMethod: {
      type: String,
      required: [true, 'Payment method is required'],
      trim: true
    },
    status: {
      type: String,
      enum: ['active', 'expired', 'cancelled'],
      default: 'active',
      required: [true, 'Subscription status is required']
    },
    startDate: {
      type: Date,
      required: [true, 'Start date is required'],
      validate: {
        validator: (value) => value <= new Date(),
        message: 'Start date cannot be in the future'
      }
    },
    renewalDate: {
      type: Date,
      validate: {
        validator: function (value) {
          return value > this.startDate
        },
        message: 'Renewal date must be after the start date'
      }
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'User ID is required'],
      index: true
    }
  },
  {
    timestamps: true
  }
)

subscriptionSchema.pre('save', function (next) {
  if (!this.renewalDate) {
    const renewalPeriods = {
      daily: 1,
      weekly: 7,
      monthly: 30,
      yearly: 365
    }

    this.renewalDate = new Date(this.startDate)
    this.renewalDate.setDate(
      this.renewalDate.getDate() + renewalPeriods[this.frequency]
    )
  }
  next()
})

const Subscription = mongoose.model('Subscription', subscriptionSchema)
export default Subscription
