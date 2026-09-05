import json, sys, os
ALLOWED_SOURCE_TYPES = {'JOB_SHEET', 'TECHNICIAN_SUBMISSION', 'OWNER_ENTERED'}
def validate_case_studies(filepath='data/repair_case_studies.json'):
    if not os.path.exists(filepath):
        print(f'ERROR: File {filepath} not found.')
        return False
    with open(filepath, 'r') as f:
        data = json.load(f)
    cases = data.get('case_studies', [])
    print(f'Auditing {len(cases)} case study records in {filepath}...')
    for idx, case in enumerate(cases):
        case_id = case.get('case_id', f'INDEX_{idx}')
        pub_status = str(case.get('publication_status', '')).upper()
        verif_status = str(case.get('verification_status', '')).upper()
        if pub_status in {'VERIFIED', 'PUBLISHED'} or verif_status in {'VERIFIED', 'PUBLISHED'}:
            source_type = case.get('source_type')
            if source_type not in ALLOWED_SOURCE_TYPES:
                print(f'CRITICAL FAIL [{case_id}]: Invalid source_type "{source_type}".')
                return False
            if not case.get('source_reference'):
                print(f'CRITICAL FAIL [{case_id}]: Missing physical workshop source_reference.')
                return False
            if case.get('human_verified') is not True:
                print(f'CRITICAL FAIL [{case_id}]: human_verified must be explicitly True.')
                return False
            if not case.get('verified_by'):
                print(f'CRITICAL FAIL [{case_id}]: Missing technician identity verified_by.')
                return False
            if not case.get('verification_timestamp'):
                print(f'CRITICAL FAIL [{case_id}]: Missing verification_timestamp.')
                return False
            permission = case.get('customer_publication_permission') or case.get('permission_status')
            if permission not in {True, 'GRANTED', 'CONFIRMED'}:
                print(f'CRITICAL FAIL [{case_id}]: Customer publication permission not GRANTED.')
                return False
            if not case.get('evidence_reference'):
                print(f'CRITICAL FAIL [{case_id}]: Missing evidence_reference.')
                return False
    print('PASS: All case study records satisfy strict human-verification integrity gate.')
    return True
if __name__ == '__main__':
    if not validate_case_studies():
        sys.exit(1)
