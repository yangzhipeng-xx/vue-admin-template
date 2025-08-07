
export const PROBLEM_TABLE_WIDTH = [
  'description',
  'contrast_test',
  'problem_details',
  'analysis_and_progress',
  'problem_reason',
  'merge_plan',
  'impact_assessment',
  'review_conclusion',
  'certification_must_be_solved',
  'exempt_remark',
  'risk_reason',
  'hm_in_remark'
]

export const PROBLEM_INT_DATA = [
  'serial_number'
]
export const PROBLEM_DATE_TIME = [
  'merge_date',
  'problem_first_found_time',
  'update_time',
  'problem_close_date',
  'created_time'
]

export const EXEMPT_TABLE_WIDTH = [
  'description',
  'contrast_test',
  'problem_details',
  'analysis_and_progress',
  'problem_reason',
  'merge_plan',
  'impact_assessment',
  'review_conclusion',
  'problem_impact',
  'exempt_type',
  'exempt_reason',
  'meeting_suggestion',
  'exempt_progress',
  'remaining_matters',
  'unresolved_impact',
  'effective_remark'
]

export const EXEMPT_DATE_TIME = [
  'problem_first_found_time',
  'merge_date',
  'report_date',
  'exempt_end_date',
  'review_exempt_end_date',
  'plan_deal_date',
  'effective_date',
  'expiry_date',
  'update_time',
  'created_time'
]

export const SCREEN_CONFIG = {
  'capacity': 133,
  'introduce': '星汉实验室（鸿蒙外设认证实验室），是专注于外设认证测试的实验室，致力于制定接口协议、功能兼容性、性能稳定性以及体验场景KEP/KEI的测试标准和流程规范。\n该实验室针对ToC（面向消费者）和ToB（面向企业）的多品类外设进行全面的认证测试，并授权颁发鸿蒙外设认证证书，为消费者提供外设采购的有力依据，为鸿蒙生态的繁荣发展提供强有力的支持。',
  'method': [
    {
      'id': '2001',
      'is_select': true,
      'name': '手动选择'
    },
    {
      'id': '2002',
      'is_select': false,
      'name': '自动轮播'
    }
  ],
  'select_page': [
    {
      'id': '1001',
      'is_select': true,
      'name': '鸿蒙外设认证实验室',
      'show_time': 30,
      'src_path': '/static/screenshot-20250623-091649.png'
    },
    {
      'id': '1002',
      'is_select': false,
      'name': '页面2',
      'show_time': 15,
      'src_path': ''
    },
    {
      'id': '1003',
      'is_select': false,
      'name': '页面3',
      'show_time': 30,
      'src_path': ''
    }
  ]
}

export const TABLE_WIDTH = [
  'support_function',
  'product_function',
  'transfer_test_remark',
  'soft_network',
  'hardware_network',
  'self_check',
  'report_remark',
  'certification_remark',
  'certification_remark_two',
  'certification_remark_three',
  'certification_remark_four',
  'certification_remark_five',
  'no_apply_for_but_pass',
  'in_remark'
]

export const INT_DATA = [
  'serial_number',
  'sample_num',
  'too_high',
  'high',
  'low',
  'warn'
]

export const DATE_TIME_DATA = [
  'task_send_time',
  'plan_arrive_time',
  'init_deadline',
  'arrive_time',
  'new_deadline',
  'transfer_test_time',
  'init_publish_time',
  'publish_time',
  'certification_date',
  'certification_date_two',
  'certification_date_three',
  'certification_date_four',
  'certification_date_five',
  'test_start_time',
  'plan_test_finish_time',
  'test_finish_time',
  'report_date',
  'plan_finish_time',
  'report_out_date',
  'update_time',
  'created_time',
  'certification_time'
]
