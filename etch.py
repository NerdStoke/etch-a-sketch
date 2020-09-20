from raspiGPIOext.motors.stepper import Stepper_ROHS_28BYJ48
from threading import Thread

def run_stepper(pins,angle,speed):
    Stepper_ROHS_28BYJ48(pins).move_by_angle(angle=angle,speed=speed)

Thread(target=run_stepper, args=([4,17,27,22],15,3.5)).start()
Thread(target=run_stepper, args=([12,16,20,21],360,3.5)).start()